const { getUpcomingEvents, getPastEvents } = require('../lib/api/events')

module.exports = async function() {
  const { data: upcoming, error: upcomingError } = await getUpcomingEvents(10)
  const { data: past, error: pastError } = await getPastEvents(5)
  
  if (upcomingError) {
    console.error('Error fetching upcoming events:', upcomingError)
  }
  
  if (pastError) {
    console.error('Error fetching past events:', pastError)
  }
  
  return {
    upcoming: upcoming || [],
    past: past || []
  }
}
