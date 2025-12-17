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
    return fallback.map((e) => ({
      title: e.title,
      slug: e.slug,
      description: e.description,
      date: safeDate(e.date),
      endDateTime: addHours(safeDate(e.date), 1),
      location: e.location,
      zoomUrl: e.zoomLink || e.zoomUrl || null,
      registrationUrl: e.registrationLink || e.registrationUrl || null
    }))
  }

  try {
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
      eventType
    }`

    const results = await client.fetch(query)

    return (Array.isArray(results) ? results : []).map((e) => {
      const isVirtual = Boolean(e?.location?.isVirtual)
      const location = isVirtual ? 'Online' : e?.location?.physicalLocation || ''
      const zoomUrl = isVirtual ? e?.location?.virtualLink || null : null
      const mapUrl = !isVirtual ? e?.location?.mapLink || null : null

      return {
        title: e.title,
        slug: e.slug,
        description: portableTextToPlainText(e.description),
        date: safeDate(e.startDateTime),
        endDateTime: safeDate(e.endDateTime),
        location,
        zoomUrl,
        mapUrl,
        registrationUrl: e.registrationRequired ? e.registrationLink || null : null,
        eventType: e.eventType
      }
    })
  } catch {
    return fallback.map((e) => ({
      title: e.title,
      slug: e.slug,
      description: e.description,
      date: safeDate(e.date),
      endDateTime: addHours(safeDate(e.date), 1),
      location: e.location,
      zoomUrl: e.zoomLink || e.zoomUrl || null,
      registrationUrl: e.registrationLink || e.registrationUrl || null
    }))
  }
}
