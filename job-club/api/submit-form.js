const {createClient} = require('@sanity/client')

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

function trimString(value) {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed ? trimmed : undefined
}

function readStreamBody(req) {
  return new Promise((resolve, reject) => {
    if (!req || req.readableEnded) return resolve('')
    let data = ''
    req.setEncoding('utf8')
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

function getJsonBody(req) {
  if (!req) return {}
  if (req.body && typeof req.body === 'object') return req.body
  if (Buffer.isBuffer(req.body)) {
    try {
      return JSON.parse(req.body.toString('utf8'))
    } catch {
      return {}
    }
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return {}
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false
})

function getAirtableToken() {
  return process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_PAT
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

  try {
    if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_DATASET || !process.env.SANITY_WRITE_TOKEN) {
      res.writeHead(500, {...DEFAULT_HEADERS, ...cors})
      res.end(
        JSON.stringify({
          error: 'Server misconfigured',
          message: 'Missing required Sanity environment variables',
          required: ['SANITY_PROJECT_ID', 'SANITY_DATASET', 'SANITY_WRITE_TOKEN']
        })
      )
      return
    }

    const rawBody = (typeof req.body === 'undefined' || req.body === null) ? await readStreamBody(req) : ''
    const data = getJsonBody({body: rawBody || req.body})

    const inferredName = [data.firstName, data.lastName].filter(Boolean).join(' ').trim()
    const name = (data.name || inferredName || '').trim()
    const email = (data.email || '').trim().toLowerCase()
    const careerGoal = (data.careerGoal || data.careerPath || '').trim()

    if (!name || !email || !careerGoal) {
      res.writeHead(400, {...DEFAULT_HEADERS, ...cors})
      res.end(
        JSON.stringify({
          error: 'Missing required fields',
          required: ['name', 'email', 'careerGoal']
        })
      )
      return
    }

    if (!email.includes('@njit.edu')) {
      res.writeHead(400, {...DEFAULT_HEADERS, ...cors})
      res.end(JSON.stringify({error: 'Must use an NJIT email address'}))
      return
    }

    const majorInput = trimString(data.major)
    const graduationYearInput = trimString(data.graduationYear)
    const linkedinInput = trimString(data.linkedin || data.linkedinUrl)
    const githubInput = trimString(data.github || data.githubUrl)
    const portfolioInput = trimString(data.portfolio || data.portfolioUrl)
    const calendlyInput = trimString(data.calendly || data.calendlyLink)

    const submittedAt = new Date().toISOString()

    const existingMember = await client.fetch(`*[_type == "memberProfile" && email == $email][0]`, {
      email
    })

    const major = majorInput || existingMember?.major
    const graduationYear = graduationYearInput || existingMember?.graduationYear

    const socialLinks = {
      linkedin: linkedinInput || existingMember?.socialLinks?.linkedin,
      github: githubInput || existingMember?.socialLinks?.github,
      portfolio: portfolioInput || existingMember?.socialLinks?.portfolio,
      calendly: calendlyInput || existingMember?.socialLinks?.calendly
    }

    const missingPrerequisites = {
      linkedin: !socialLinks.linkedin,
      github: !socialLinks.github,
      portfolio: !socialLinks.portfolio,
      calendly: !socialLinks.calendly
    }

    const missingAny = Object.values(missingPrerequisites).some(Boolean)
    const existingOnboardingStatus = existingMember?.onboarding?.status
    const onboardingStatus =
      existingOnboardingStatus === 'completed' ? 'completed' : missingAny ? 'in_progress' : 'completed'

    const onboardingSubmittedAt = existingMember?.onboarding?.submittedAt || submittedAt
    const onboardingCompletedAt =
      onboardingStatus === 'completed'
        ? existingMember?.onboarding?.completedAt || submittedAt
        : existingMember?.onboarding?.completedAt

    const baseFields = {
      name,
      email,
      major,
      graduationYear,
      careerGoal,
      status: existingMember?.status || 'new',
      joinDate: existingMember?.joinDate || submittedAt,
      lastActive: submittedAt,
      socialLinks,
      onboarding: {
        status: onboardingStatus,
        submittedAt: onboardingSubmittedAt,
        completedAt: onboardingCompletedAt,
        missingPrerequisites
      }
    }

    let member
    if (existingMember?._id) {
      member = await client.patch(existingMember._id).set(baseFields).commit()
    } else {
      member = await client.create({_type: 'memberProfile', ...baseFields})
    }

    if (process.env.ZAPIER_WEBHOOK_URL) {
      try {
        await fetch(process.env.ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            source: 'job-club',
            type: 'onboarding_submission',
            submittedAt,
            memberId: member._id,
            name,
            email,
            major,
            graduationYear,
            careerGoal,
            socialLinks,
            missingPrerequisites
          })
        })
      } catch (e) {
        console.error('Zapier forward failed:', e)
      }
    }

    const airtableToken = getAirtableToken()
    if (airtableToken && process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_TABLE_NAME) {
      try {
        const baseUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(
          process.env.AIRTABLE_TABLE_NAME
        )}`

        const authHeaders = {
          Authorization: `Bearer ${airtableToken}`,
          'Content-Type': 'application/json'
        }

        const filterFormula = `({Email} = "${email.replace(/\"/g, '')}")`
        const searchUrl = `${baseUrl}?maxRecords=1&filterByFormula=${encodeURIComponent(filterFormula)}`
        const searchResp = await fetch(searchUrl, {headers: authHeaders})
        const searchJson = await searchResp.json()
        const existingRecord = Array.isArray(searchJson.records) ? searchJson.records[0] : null

        const fields = {
          Name: name,
          Email: email,
          Major: major,
          GraduationYear: graduationYear,
          CareerGoal: careerGoal,
          LinkedIn: socialLinks.linkedin,
          GitHub: socialLinks.github,
          Portfolio: socialLinks.portfolio,
          Calendly: socialLinks.calendly,
          OnboardingStatus: onboardingStatus,
          SubmittedAt: onboardingSubmittedAt,
          MissingLinkedIn: missingPrerequisites.linkedin,
          MissingGitHub: missingPrerequisites.github,
          MissingPortfolio: missingPrerequisites.portfolio,
          MissingCalendly: missingPrerequisites.calendly,
          SanityMemberId: member._id
        }

        if (existingRecord?.id) {
          await fetch(`${baseUrl}/${existingRecord.id}`, {
            method: 'PATCH',
            headers: authHeaders,
            body: JSON.stringify({fields})
          })
        } else {
          await fetch(baseUrl, {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify({records: [{fields}]})
          })
        }
      } catch (e) {
        console.error('Airtable upsert failed:', e)
      }
    }

    res.writeHead(200, {...DEFAULT_HEADERS, ...cors})
    res.end(JSON.stringify({success: true, member, message: 'Member profile created successfully'}))
  } catch (error) {
    console.error('Error submitting form:', error)
    res.writeHead(500, {...DEFAULT_HEADERS, ...cors})
    res.end(JSON.stringify({error: 'Internal Server Error', message: error.message}))
  }
}
