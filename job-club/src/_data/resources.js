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

module.exports = async function() {
  const fallback = require('./resources.json')

  const client = createSanityClient()
  if (!client) {
    // Return fallback data with all fields for frontend modal
    return fallback.map((r) => ({
      title: r.title,
      slug: r.slug,
      category: r.category,
      description: r.description || r.excerpt || '',
      icon: r.icon || 'document',
      type: r.type || (r.url ? 'external' : 'internal'),
      url: r.url || (r.slug ? `/resources/${r.slug}/` : '#'),
      externalLink: r.url || null,
      fullDescription: r.fullDescription || r.description || '',
      content: r.content || [],
      actionText: r.actionText || 'Learn More',
      actionUrl: r.actionUrl || r.url || '#'
    }))
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

    return (Array.isArray(results) ? results : []).map((r) => {
      const category = Array.isArray(r.categories) && r.categories[0] ? r.categories[0] : r.resourceType
      const isExternal = Boolean(r.externalLink)
      const url = r.externalLink || (r.slug ? `/resources/${r.slug}/` : '#')

      return {
        title: r.title,
        slug: r.slug,
        category,
        description: r.description,
        icon: 'document', // Default icon for Sanity resources
        type: isExternal ? 'external' : 'internal',
        url,
        externalLink: r.externalLink || null,
        fullDescription: r.description,
        content: Array.isArray(r.content) ? r.content : [],
        actionText: 'Learn More',
        actionUrl: r.externalLink || '#'
      }
    })
  } catch {
    return fallback.map((r) => ({
      title: r.title,
      slug: r.slug,
      category: r.category,
      description: r.description || r.excerpt || '',
      icon: r.icon || 'document',
      type: r.type || (r.url ? 'external' : 'internal'),
      url: r.url || (r.slug ? `/resources/${r.slug}/` : '#'),
      externalLink: r.url || null,
      fullDescription: r.fullDescription || r.description || '',
      content: r.content || [],
      actionText: r.actionText || 'Learn More',
      actionUrl: r.actionUrl || r.url || '#'
    }))
  }
}
