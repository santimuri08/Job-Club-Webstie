const {createClient} = require('@sanity/client')

function safeDate(value) {
  if (!value) return undefined
  const d = new Date(value)
  return isNaN(d.getTime()) ? undefined : d.toISOString()
}

function addHours(isoString, hours) {
  if (!isoString) return undefined
  const d = new Date(isoString)
  if (isNaN(d.getTime())) return undefined
  d.setHours(d.getHours() + hours)
  return d.toISOString()
}

function portableTextToPlainText(blocks) {
  if (!Array.isArray(blocks)) return ''
  const parts = []
  for (const block of blocks) {
    if (block && block._type === 'block' && Array.isArray(block.children)) {
      const text = block.children.map((c) => c && c.text).filter(Boolean).join('')
      if (text) parts.push(text)
    }
  }
  return parts.join('\n\n')
}

function createSanityClient() {
  if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_DATASET) return null
  return createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: process.env.SANITY_API_VERSION || '2023-05-03',
    useCdn: true
  })
}

module.exports = async function() {
  const fallback = require('./events.json')

  const client = createSanityClient()
  if (!client) {
    // Return fallback with all fields for frontend
    return fallback.map((e) => ({
      // Original backend fields
      title: e.title,
      slug: e.slug,
      description: e.description,
      date: safeDate(e.date),
      endDateTime: addHours(safeDate(e.date), 1),
      location: e.location,
      zoomUrl: e.zoomLink || e.zoomUrl || null,
      registrationUrl: e.registration?.externalUrl || e.registrationLink || e.registrationUrl || null,
      // NEW: Frontend fields
      id: e.id || e.slug,
      time: e.time || null,
      endTime: e.endTime || null,
      timezone: e.timezone || 'EST',
      type: e.type || 'virtual',
      category: e.category || 'Workshop',
      status: e.status || 'upcoming',
      address: e.address || null,
      fullDescription: e.fullDescription || e.description || '',
      speakers: e.speakers || [],
      agenda: e.agenda || [],
      registration: e.registration || null,
      spotsTotal: e.spotsTotal || null,
      spotsLeft: e.spotsLeft || null,
      recordingUrl: e.recordingUrl || null,
      resources: e.resources || []
    }))
  }

  try {
    // UPDATED QUERY: Added new frontend fields
    const query = `*[_type == "event" && workflowStatus == "published"]|order(startDateTime asc){
      title,
      "slug": slug.current,
      description,
      startDateTime,
      endDateTime,
      workflowStatus,
      publishedAt,
      location,
      registrationRequired,
      registrationLink,
      eventType,
      eventId,
      time,
      endTime,
      timezone,
      eventCategory,
      eventStatus,
      isVirtual,
      address,
      fullDescription,
      spotsTotal,
      spotsLeft,
      speakers,
      agenda,
      registrationType,
      registrationQuestions,
      recordingUrl,
      eventResources
    }`

    const results = await client.fetch(query)

    return (Array.isArray(results) ? results : []).map((e) => {
      // Determine if virtual
      const isVirtual = e.isVirtual ?? Boolean(e?.location?.isVirtual)
      
      // Determine location string
      const location = isVirtual 
        ? 'Online' 
        : e?.location?.physicalLocation || e.location || ''
      
      // Zoom URL for virtual events
      const zoomUrl = isVirtual ? e?.location?.virtualLink || null : null
      
      // Map URL for in-person events
      const mapUrl = !isVirtual ? e?.location?.mapLink || null : null

      return {
        // Original backend fields (unchanged)
        title: e.title,
        slug: e.slug,
        description: typeof e.description === 'string' 
          ? e.description 
          : portableTextToPlainText(e.description),
        date: safeDate(e.startDateTime),
        endDateTime: safeDate(e.endDateTime),
        location,
        zoomUrl,
        mapUrl,
        registrationUrl: e.registrationRequired ? e.registrationLink || null : null,
        eventType: e.eventType,
        
        // NEW: Frontend fields
        id: e.eventId || e.slug,
        time: e.time || null,
        endTime: e.endTime || null,
        timezone: e.timezone || 'EST',
        type: isVirtual ? 'virtual' : 'in-person',
        category: e.eventCategory || 'Workshop',
        status: e.eventStatus || 'upcoming',
        address: e.address || null,
        fullDescription: e.fullDescription || (typeof e.description === 'string' 
          ? e.description 
          : portableTextToPlainText(e.description)) || '',
        speakers: Array.isArray(e.speakers) ? e.speakers : [],
        agenda: Array.isArray(e.agenda) ? e.agenda : [],
        registration: e.registrationType ? {
          type: e.registrationType,
          externalUrl: e.registrationLink || null,
          questions: e.registrationQuestions || []
        } : null,
        spotsTotal: e.spotsTotal || null,
        spotsLeft: e.spotsLeft || null,
        recordingUrl: e.recordingUrl || null,
        resources: Array.isArray(e.eventResources) ? e.eventResources : []
      }
    })
  } catch {
    // Fallback with all fields on error
    return fallback.map((e) => ({
      // Original backend fields
      title: e.title,
      slug: e.slug,
      description: e.description,
      date: safeDate(e.date),
      endDateTime: addHours(safeDate(e.date), 1),
      location: e.location,
      zoomUrl: e.zoomLink || e.zoomUrl || null,
      registrationUrl: e.registration?.externalUrl || e.registrationLink || e.registrationUrl || null,
      // NEW: Frontend fields
      id: e.id || e.slug,
      time: e.time || null,
      endTime: e.endTime || null,
      timezone: e.timezone || 'EST',
      type: e.type || 'virtual',
      category: e.category || 'Workshop',
      status: e.status || 'upcoming',
      address: e.address || null,
      fullDescription: e.fullDescription || e.description || '',
      speakers: e.speakers || [],
      agenda: e.agenda || [],
      registration: e.registration || null,
      spotsTotal: e.spotsTotal || null,
      spotsLeft: e.spotsLeft || null,
      recordingUrl: e.recordingUrl || null,
      resources: e.resources || []
    }))
  }
}
