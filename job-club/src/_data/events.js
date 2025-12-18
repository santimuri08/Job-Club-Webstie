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

function getEventStatus(dateString) {
  if (!dateString) return 'upcoming'
  const eventDate = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return eventDate < today ? 'past' : 'upcoming'
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
  // Try to load fallback JSON
  let fallback = []
  try {
    fallback = require('./events-fallback.json')
  } catch (e) {
    try {
      fallback = require('./events.json')
    } catch (e2) {
      console.log('No fallback events data found')
    }
  }

  const client = createSanityClient()
  if (!client) {
    // No Sanity configured - use fallback data directly
    // The fallback already has all fields including status
    return fallback.map((e) => ({
      id: e.id || e.slug,
      title: e.title,
      slug: e.slug,
      description: e.description,
      fullDescription: e.fullDescription || e.description,
      date: safeDate(e.date),
      endDateTime: addHours(safeDate(e.date), 2),
      time: e.time || '',
      timezone: e.timezone || 'EST',
      location: e.location,
      address: e.address || null,
      type: e.type || 'in-person',
      category: e.category || 'Event',
      status: e.status || getEventStatus(e.date),
      spotsTotal: e.spotsTotal || null,
      spotsLeft: e.spotsLeft || null,
      speakers: e.speakers || [],
      agenda: e.agenda || [],
      resources: e.resources || [],
      recordingUrl: e.recordingUrl || null,
      registrationUrl: e.registrationUrl || null,
      zoomUrl: e.zoomLink || e.zoomUrl || e.virtualLink || null,
      tags: e.tags || []
    }))
  }

  try {
    const query = `*[_type == "event" && workflowStatus == "published"]|order(startDateTime asc){
      _id,
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
      capacity,
      "speakers": speakers[]->{
        name,
        title,
        organization,
        bio,
        "linkedin": links.linkedin
      },
      agenda
    }`

    const results = await client.fetch(query)

    if (!Array.isArray(results) || results.length === 0) {
      // Sanity returned empty - use fallback
      return fallback.map((e) => ({
        id: e.id || e.slug,
        title: e.title,
        slug: e.slug,
        description: e.description,
        fullDescription: e.fullDescription || e.description,
        date: safeDate(e.date),
        endDateTime: addHours(safeDate(e.date), 2),
        time: e.time || '',
        timezone: e.timezone || 'EST',
        location: e.location,
        address: e.address || null,
        type: e.type || 'in-person',
        category: e.category || 'Event',
        status: e.status || getEventStatus(e.date),
        spotsTotal: e.spotsTotal || null,
        spotsLeft: e.spotsLeft || null,
        speakers: e.speakers || [],
        agenda: e.agenda || [],
        resources: e.resources || [],
        recordingUrl: e.recordingUrl || null,
        registrationUrl: e.registrationUrl || null,
        zoomUrl: e.zoomLink || e.zoomUrl || e.virtualLink || null,
        tags: e.tags || []
      }))
    }

    return results.map((e) => {
      const isVirtual = Boolean(e?.location?.isVirtual)
      const location = isVirtual ? 'Virtual (Zoom)' : e?.location?.physicalLocation || ''
      const zoomUrl = isVirtual ? e?.location?.virtualLink || null : null
      const mapUrl = !isVirtual ? e?.location?.mapLink || null : null
      const eventDate = safeDate(e.startDateTime)

      return {
        id: e._id,
        title: e.title,
        slug: e.slug,
        description: portableTextToPlainText(e.description),
        fullDescription: portableTextToPlainText(e.description),
        date: eventDate,
        endDateTime: safeDate(e.endDateTime),
        time: eventDate ? new Date(eventDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '',
        timezone: 'EST',
        location,
        address: e?.location?.physicalLocation || null,
        type: isVirtual ? 'virtual' : 'in-person',
        category: e.eventType || 'Event',
        status: getEventStatus(e.startDateTime),
        spotsTotal: e.capacity || null,
        spotsLeft: e.capacity ? Math.floor(e.capacity * 0.3) : null, // Placeholder
        speakers: e.speakers || [],
        agenda: e.agenda || [],
        resources: [],
        recordingUrl: null,
        registrationUrl: e.registrationRequired ? e.registrationLink || null : null,
        zoomUrl,
        mapUrl,
        tags: []
      }
    })
  } catch (err) {
    console.error('Error fetching events from Sanity:', err.message)
    // On error - use fallback
    return fallback.map((e) => ({
      id: e.id || e.slug,
      title: e.title,
      slug: e.slug,
      description: e.description,
      fullDescription: e.fullDescription || e.description,
      date: safeDate(e.date),
      endDateTime: addHours(safeDate(e.date), 2),
      time: e.time || '',
      timezone: e.timezone || 'EST',
      location: e.location,
      address: e.address || null,
      type: e.type || 'in-person',
      category: e.category || 'Event',
      status: e.status || getEventStatus(e.date),
      spotsTotal: e.spotsTotal || null,
      spotsLeft: e.spotsLeft || null,
      speakers: e.speakers || [],
      agenda: e.agenda || [],
      resources: e.resources || [],
      recordingUrl: e.recordingUrl || null,
      registrationUrl: e.registrationUrl || null,
      zoomUrl: e.zoomLink || e.zoomUrl || e.virtualLink || null,
      tags: e.tags || []
    }))
  }
}
