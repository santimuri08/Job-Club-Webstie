const {createClient} = require('@sanity/client')

function createSanityClient() {
  if (!process.env.SANITY_PROJECT_ID || !process.env.SANITY_DATASET) return null
  return createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: process.env.SANITY_API_VERSION || '2023-05-03',
    useCdn: true
  })
}

// Helper to remove duplicate slugs
function dedupeBySlug(items) {
  const seen = new Set()
  return items.filter(item => {
    if (!item.slug || seen.has(item.slug)) return false
    seen.add(item.slug)
    return true
  })
}

// Helper to map fallback data to consistent format
function mapFallbackData(fallback) {
  return dedupeBySlug(fallback.map((r) => ({
    title: r.title,
    slug: r.slug,
    category: r.category,
    description: r.description || r.excerpt || '',
    url: r.url || (r.slug ? `/resources/${r.slug}/` : '#'),
    externalLink: r.url || null,
    content: r.content || [],
    // Include additional fields for the modal/cards
    icon: r.icon || null,
    type: r.type || 'internal',
    fullDescription: r.fullDescription || r.description || '',
    actionText: r.actionText || 'View Guide',
    actionUrl: r.actionUrl || '#'
  })))
}

module.exports = async function() {
  const fallback = require('./resources-fallback.json')

  const client = createSanityClient()
  if (!client) {
    console.log('Sanity not configured, using fallback resources data')
    return mapFallbackData(fallback)
  }

  try {
    const query = `*[_type == "resource" && workflowStatus == "published"]|order(publishedAt desc){
      title,
      "slug": slug.current,
      description,
      resourceType,
      externalLink,
      content,
      "categories": categories[]->title
    }`

    const results = await client.fetch(query)

    // FIX: If Sanity returns empty results, use fallback data
    if (!results || results.length === 0) {
      console.log('Sanity returned no published resources, using fallback data')
      return mapFallbackData(fallback)
    }

    return dedupeBySlug((Array.isArray(results) ? results : []).map((r) => {
      const category = Array.isArray(r.categories) && r.categories[0] ? r.categories[0] : r.resourceType
      const url = r.externalLink || (r.slug ? `/resources/${r.slug}/` : '#')

      return {
        title: r.title,
        slug: r.slug,
        category,
        description: r.description,
        url,
        externalLink: r.externalLink || null,
        content: Array.isArray(r.content) ? r.content : []
      }
    }))
  } catch (error) {
    console.error('Error fetching resources from Sanity:', error.message)
    return mapFallbackData(fallback)
  }
}
