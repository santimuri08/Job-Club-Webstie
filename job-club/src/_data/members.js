const { getMembersByStatus } = require('../lib/api/members')

module.exports = async function() {
  const { data: active, error: activeError } = await getMembersByStatus('active', 10)
  const { data: newMembers, error: newMembersError } = await getMembersByStatus('new', 5)
  
  if (activeError) {
    console.error('Error fetching active members:', activeError)
  }
  
  if (newMembersError) {
    console.error('Error fetching new members:', newMembersError)
  }
  
  return {
    active: active || [],
    new: newMembers || []
  }
}
