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

module.exports = async function() {
  const fallback = require('./resources-fallback.json')

  const client = createSanityClient()
  if (!client) {
    return dedupeBySlug(fallback.map((r) => ({
      title: r.title,
      slug: r.slug,
      category: r.category,
      description: r.description || r.excerpt || '',
      url: r.url || (r.slug ? `/resources/${r.slug}/` : '#'),
      externalLink: r.url || null,
      content: []
    })))
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
  } catch {
    return dedupeBySlug(fallback.map((r) => ({
      title: r.title,
      slug: r.slug,
      category: r.category,
      description: r.description || r.excerpt || '',
      url: r.url || (r.slug ? `/resources/${r.slug}/` : '#'),
      externalLink: r.url || null,
      content: []
    })))
  }
}
