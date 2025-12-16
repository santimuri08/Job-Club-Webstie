// Airtable CRM Integration
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_MEMBERS_TABLE = process.env.AIRTABLE_MEMBERS_TABLE || 'Members'

// Airtable API endpoint
const AIRTABLE_API = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_MEMBERS_TABLE}`

// Headers for API requests
const headers = {
  'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
  'Content-Type': 'application/json'
}

// Helper function to make Airtable API calls
async function airtableRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers,
      ...options
    })

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Airtable request failed:', error)
    return { error: error.message }
  }
}

// Create member record in Airtable
export async function createMemberRecord(memberData) {
  const fields = {
    'Name': memberData.name,
    'Email': memberData.email,
    'Career Goal': memberData.careerGoal,
    'Status': 'new',
    'Join Date': new Date().toISOString().split('T')[0],
    'Last Active': new Date().toISOString().split('T')[0],
    'LinkedIn': memberData.socialLinks?.linkedin || '',
    'GitHub': memberData.socialLinks?.github || '',
    'Portfolio': memberData.socialLinks?.portfolio || '',
    'Bio': memberData.bio || '',
    'Skills': (memberData.skills || []).join(', ')
  }

  const data = {
    fields
  }

  return airtableRequest(AIRTABLE_API, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

// Update member record in Airtable
export async function updateMemberRecord(recordId, updates) {
  const fields = {}

  // Map updates to Airtable fields
  if (updates.name) fields['Name'] = updates.name
  if (updates.careerGoal) fields['Career Goal'] = updates.careerGoal
  if (updates.status) fields['Status'] = updates.status
  if (updates.bio) fields['Bio'] = updates.bio
  if (updates.skills) fields['Skills'] = Array.isArray(updates.skills) ? updates.skills.join(', ') : updates.skills
  if (updates.lastActive) fields['Last Active'] = updates.lastActive.split('T')[0]

  // Handle social links updates
  if (updates.socialLinks) {
    if (updates.socialLinks.linkedin) fields['LinkedIn'] = updates.socialLinks.linkedin
    if (updates.socialLinks.github) fields['GitHub'] = updates.socialLinks.github
    if (updates.socialLinks.portfolio) fields['Portfolio'] = updates.socialLinks.portfolio
  }

  const data = { fields }

  return airtableRequest(`${AIRTABLE_API}/${recordId}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  })
}

// Get member by email
export async function getMemberByEmail(email) {
  const filterFormula = `{Email} = "${email}"`
  const url = `${AIRTABLE_API}?filterByFormula=${encodeURIComponent(filterFormula)}`
  
  const result = await airtableRequest(url)
  
  if (result.error) {
    return { error: result.error }
  }

  // Return first matching record or null
  const record = result.records && result.records.length > 0 ? result.records[0] : null
  return { data: record }
}

// Get all members with optional status filter
export async function getAllMembers(status = null) {
  let url = AIRTABLE_API
  
  if (status) {
    const filterFormula = `{Status} = "${status}"`
    url = `${AIRTABLE_API}?filterByFormula=${encodeURIComponent(filterFormula)}`
  }

  return airtableRequest(url)
}

// Test Airtable connection
export async function testConnection() {
  try {
    const result = await airtableRequest(AIRTABLE_API + '?maxRecords=1')
    return { success: !result.error, data: result }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
