const crypto = require('crypto')

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store'
}

function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': process.env.CORS_ALLOW_ORIGIN || '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  }
}

function extractDoc(payload) {
  if (!payload || typeof payload !== 'object') return undefined
  if (payload._type && payload._id) return payload
  if (payload.document && payload.document._type) return payload.document
  if (payload.result && payload.result._type) return payload.result
  return undefined
}

function timingSafeEqual(a, b) {
  const aBuf = Buffer.from(String(a || ''), 'utf8')
  const bBuf = Buffer.from(String(b || ''), 'utf8')

  if (aBuf.length !== bBuf.length) return false
  return crypto.timingSafeEqual(aBuf, bBuf)
}

function verifySanitySignature({ body, signature, secret }) {
  if (!secret) return true
  if (!signature) return false

  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(body, 'utf8')
  const digest = hmac.digest('hex')

  const normalized = String(signature).trim()
  const expectedA = digest
  const expectedB = `sha256=${digest}`

  return timingSafeEqual(normalized, expectedA) || timingSafeEqual(normalized, expectedB)
}

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        ...DEFAULT_HEADERS,
        ...getCorsHeaders()
      },
      body: ''
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        ...DEFAULT_HEADERS,
        ...getCorsHeaders()
      },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    }
  }

  const body = event.body || ''

  const signature = event.headers?.['x-sanity-signature'] || event.headers?.['X-Sanity-Signature']
  const secret = process.env.SANITY_WEBHOOK_SECRET

  if (!verifySanitySignature({ body, signature, secret })) {
    return {
      statusCode: 401,
      headers: {
        ...DEFAULT_HEADERS,
        ...getCorsHeaders()
      },
      body: JSON.stringify({ error: 'Invalid signature' })
    }
  }

  let payload
  try {
    payload = JSON.parse(body || '{}')
  } catch (e) {
    return {
      statusCode: 400,
      headers: {
        ...DEFAULT_HEADERS,
        ...getCorsHeaders()
      },
      body: JSON.stringify({ error: 'Invalid JSON body' })
    }
  }

  const doc = extractDoc(payload)
  const normalized = {
    docType: doc?._type,
    docId: doc?._id,
    workflowStatus: doc?.workflowStatus,
    publishedAt: doc?.publishedAt
  }

  if (process.env.ZAPIER_WEBHOOK_URL) {
    try {
      await fetch(process.env.ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'job-club',
          type: 'sanity_webhook',
          receivedAt: new Date().toISOString(),
          normalized,
          payload
        })
      })
    } catch (e) {
      console.error('Zapier forward failed:', e)
    }
  }

  return {
    statusCode: 200,
    headers: {
      ...DEFAULT_HEADERS,
      ...getCorsHeaders()
    },
    body: JSON.stringify({ ok: true })
  }
}
