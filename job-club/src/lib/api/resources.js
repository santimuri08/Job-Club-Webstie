import { fetchQuery, getClient } from '../sanity'

const resourceProjection = `{
  _id,
  _type,
  title,
  slug,
  description,
  content,
  resourceType,
  "featuredImage": featuredImage.asset->url,
  "author": author->{
    name,
    "image": profileImage.asset->url,
    socialLinks
  },
  "url": externalLink,
  "fileUrl": fileUpload.asset->url,
  "fileName": fileUpload.asset->originalFilename,
  difficulty,
  estimatedTime,
  isFeatured,
  tags,
  publishedAt,
  "categories": categories[]->{
    title,
    slug,
    color,
    icon
  },
  "relatedResources": relatedResources[]->{_id, title, slug, resourceType}
}`

export async function getAllResources(limit = 20) {
  const query = `*[_type == "resource"] | order(publishedAt desc)[0...$limit] ${resourceProjection}`
  return fetchQuery(query, { limit })
}

export async function getFeaturedResources(limit = 6) {
  const query = `*[_type == "resource" && isFeatured == true] | order(publishedAt desc)[0...$limit] ${resourceProjection}`
  return fetchQuery(query, { limit })
}

export async function getResourceBySlug(slug) {
  const query = `*[_type == "resource" && slug.current == $slug][0] ${resourceProjection}`
  return fetchQuery(query, { slug })
}

export async function getResourcesByType(type, limit = 10) {
  const query = `*[_type == "resource" && resourceType == $type] | order(publishedAt desc)[0...$limit] ${resourceProjection}`
  return fetchQuery(query, { type, limit })
}

export async function getResourcesByCategory(categorySlug, limit = 10) {
  const query = `*[_type == "resource" && $categorySlug in categories[]->slug.current] | order(publishedAt desc)[0...$limit] ${resourceProjection}`
  return fetchQuery(query, { categorySlug, limit })
}

export async function getResourcesByDifficulty(difficulty, limit = 10) {
  const query = `*[_type == "resource" && difficulty == $difficulty] | order(publishedAt desc)[0...$limit] ${resourceProjection}`
  return fetchQuery(query, { difficulty, limit })
}

export async function searchResources(searchTerm, limit = 20) {
  const query = `*[_type == "resource" && (
    title match $searchTerm ||
    description match $searchTerm ||
    resourceType match $searchTerm ||
    tags match $searchTerm
  )] | order(publishedAt desc)[0...$limit] ${resourceProjection}`
  
  return fetchQuery(query, { searchTerm: `*${searchTerm}*`, limit })
}

export async function getResourcesByAuthor(authorId, limit = 10) {
  const query = `*[_type == "resource" && author._ref == $authorId] | order(publishedAt desc)[0...$limit] ${resourceProjection}`
  return fetchQuery(query, { authorId, limit })
}

export async function getRelatedResources(resourceId, limit = 4) {
  const query = `*[_type == "resource" && _id != $resourceId] | order(publishedAt desc)[0...$limit] ${resourceProjection}`
  return fetchQuery(query, { resourceId, limit })
}

export async function createResource(resource) {
  const client = getClient()
  try {
    const doc = {
      _type: 'resource',
      ...resource,
      publishedAt: new Date().toISOString()
    }
    const result = await client.create(doc)
    return { data: result, error: null }
  } catch (error) {
    console.error('Error creating resource:', error)
    return { data: null, error }
  }
}

export async function updateResource(id, updates) {
  const client = getClient()
  try {
    const result = await client.patch(id).set(updates).commit()
    return { data: result, error: null }
  } catch (error) {
    console.error('Error updating resource:', error)
    return { data: null, error }
  }
}
