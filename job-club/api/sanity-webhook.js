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

function timingSafeEqual(a, b) {
  const aBuf = Buffer.from(String(a || ''), 'utf8')
  const bBuf = Buffer.from(String(b || ''), 'utf8')
  if (aBuf.length !== bBuf.length) return false
  return crypto.timingSafeEqual(aBuf, bBuf)
}

function verifySanitySignature({body, signature, secret}) {
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

function extractDoc(payload) {
  if (!payload || typeof payload !== 'object') return undefined
  if (payload._type && payload._id) return payload
  if (payload.document && payload.document._type) return payload.document
  if (payload.result && payload.result._type) return payload.result
  return undefined
}

function getRawBody(req) {
  if (!req) return ''
  if (typeof req.body === 'string') return req.body
  if (req.body && typeof req.body === 'object') return JSON.stringify(req.body)
  return ''
}

function getJsonBody(req) {
  if (!req) return {}
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return {}
}

module.exports = async function handler(req, res) {
  const cors = getCorsHeaders()

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {...DEFAULT_HEADERS, ...cors})
    res.end('')
    return
  }

  if (req.method !== 'POST') {
    res.writeHead(405, {...DEFAULT_HEADERS, ...cors})
    res.end(JSON.stringify({error: 'Method Not Allowed'}))
    return
  }

  const rawBody = getRawBody(req)
  const signature = req.headers['x-sanity-signature']
  const secret = process.env.SANITY_WEBHOOK_SECRET

  if (secret && !rawBody) {
    res.writeHead(400, {...DEFAULT_HEADERS, ...cors})
    res.end(
      JSON.stringify({
        error: 'Bad Request',
        message: 'Missing webhook body; cannot verify signature',
        requiredHeader: 'x-sanity-signature'
      })
    )
    return
  }

  if (secret && !signature) {
    res.writeHead(401, {...DEFAULT_HEADERS, ...cors})
    res.end(
      JSON.stringify({
        error: 'Invalid signature',
        message: 'Missing x-sanity-signature header'
      })
    )
    return
  }

  if (!verifySanitySignature({body: rawBody, signature, secret})) {
    res.writeHead(401, {...DEFAULT_HEADERS, ...cors})
    res.end(JSON.stringify({error: 'Invalid signature'}))
    return
  }

  const payload = getJsonBody(req)
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
        headers: {'Content-Type': 'application/json'},
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

  res.writeHead(200, {...DEFAULT_HEADERS, ...cors})
  res.end(JSON.stringify({ok: true}))
}
