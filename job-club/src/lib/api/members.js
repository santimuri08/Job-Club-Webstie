import { fetchQuery, getClient, memberProjection } from '../sanity'

export async function getMemberById(id) {
  const query = `*[_type == "memberProfile" && _id == $id][0] ${memberProjection}`
  return fetchQuery(query, { id })
}

export async function getMemberByEmail(email) {
  const query = `*[_type == "memberProfile" && email == $email][0] ${memberProjection}`
  return fetchQuery(query, { email })
}

export async function searchMembers(searchTerm, limit = 10) {
  const query = `*[_type == "memberProfile" && (
    name match $searchTerm ||
    email match $searchTerm ||
    careerGoal match $searchTerm ||
    bio match $searchTerm
  )] | order(name asc)[0...$limit] ${memberProjection}`
  
  return fetchQuery(query, { searchTerm: `*${searchTerm}*`, limit })
}

export async function getMembersBySkill(skill, limit = 20) {
  const query = `*[_type == "memberProfile" && $skill in skills[]->current] | order(name asc)[0...$limit] ${memberProjection}`
  return fetchQuery(query, { skill, limit })
}

export async function getMembersByStatus(status, limit = 20) {
  const query = `*[_type == "memberProfile" && status == $status] | order(joinDate desc)[0...$limit] ${memberProjection}`
  return fetchQuery(query, { status, limit })
}

export async function updateMemberProfile(id, updates) {
  const client = getClient()
  try {
    const result = await client
      .patch(id)
      .set(updates)
      .setIfMissing({ lastActive: new Date().toISOString() })
      .commit()
    return { data: result, error: null }
  } catch (error) {
    console.error('Error updating member profile:', error)
    return { data: null, error }
  }
}

export async function createMemberProfile(profile) {
  const client = getClient()
  try {
    const doc = {
      _type: 'memberProfile',
      ...profile,
      status: 'new',
      joinDate: new Date().toISOString(),
      lastActive: new Date().toISOString()
    }
    const result = await client.create(doc)
    return { data: result, error: null }
  } catch (error) {
    console.error('Error creating member profile:', error)
    return { data: null, error }
  }
}

export async function getMembersWithRole(role, limit = 20) {
  const query = `*[_type == "memberProfile" && $role in roles[]->current] | order(name asc)[0...$limit] ${memberProjection}`
  return fetchQuery(query, { role, limit })
}
