// Dynamic events data - can switch between static and Sanity data
const useSanity = process.env.USE_SANITY === 'true'

// Static fallback data (matches current frontend structure)
const staticEvents = [
  {
    title: "AI Portfolio Workshop",
    slug: "ai-portfolio-workshop",
    description: "Learn to build an impressive AI consulting portfolio that gets you noticed by recruiters and clients.",
    date: "2025-02-15T18:00:00",
    location: "NJIT Campus Center Room 220",
    zoomUrl: null,
    registrationUrl: "https://forms.gle/example1"
  },
  {
    title: "LinkedIn Optimization Session",
    slug: "linkedin-optimization",
    description: "Optimize your LinkedIn profile to attract AI recruiters and showcase your skills effectively.",
    date: "2025-02-20T17:00:00",
    location: "Online (Zoom)",
    zoomUrl: "https://zoom.us/j/example",
    registrationUrl: "https://forms.gle/example2"
  },
  {
    title: "AI Startup Pitch Night",
    slug: "ai-startup-pitch-night",
    description: "Present your AI startup idea and get feedback from mentors and fellow entrepreneurs.",
    date: "2025-02-28T19:00:00",
    location: "NJIT Makerspace",
    zoomUrl: null,
    registrationUrl: "https://forms.gle/example3"
  }
]

module.exports = async function() {
  if (useSanity) {
    try {
      // Import Sanity API only when needed
      const { getUpcomingEvents, getPastEvents } = require('../lib/api/events')
      
      const { data: upcoming, error: upcomingError } = await getUpcomingEvents(10)
      const { data: past, error: pastError } = await getPastEvents(5)
      
      if (upcomingError) {
        console.error('Error fetching upcoming events from Sanity:', upcomingError)
      }
      
      if (pastError) {
        console.error('Error fetching past events from Sanity:', pastError)
      }
      
      return upcoming || past || []
    } catch (error) {
      console.error('Sanity connection failed, using static data:', error)
      return staticEvents
    }
  }
  
  // Return static data by default
  return staticEvents
}
