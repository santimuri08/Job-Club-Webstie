import { fetchQuery, getClient } from '../sanity'

const categoryProjection = `{
  _id,
  title,
  slug,
  description,
  icon,
  color,
  "parentCategory": parentCategory->{
    title,
    slug
  },
  isFeatured,
  seo
}`

export async function getAllCategories() {
  const query = `*[_type == "category"] | order(title asc) ${categoryProjection}`
  return fetchQuery(query)
}

export async function getFeaturedCategories(limit = 6) {
  const query = `*[_type == "category" && isFeatured == true] | order(title asc)[0...$limit] ${categoryProjection}`
  return fetchQuery(query, { limit })
}

export async function getCategoryBySlug(slug) {
  const query = `*[_type == "category" && slug.current == $slug][0] ${categoryProjection}`
  return fetchQuery(query, { slug })
}

export async function getTopLevelCategories() {
  const query = `*[_type == "category" && !defined(parentCategory)] | order(title asc) ${categoryProjection}`
  return fetchQuery(query)
}

export async function getChildCategories(parentSlug) {
  const query = `*[_type == "category" && parentCategory->slug.current == $parentSlug] | order(title asc) ${categoryProjection}`
  return fetchQuery(query, { parentSlug })
}

export async function createCategory(category) {
  const client = getClient()
  try {
    const doc = {
      _type: 'category',
      ...category
    }
    const result = await client.create(doc)
    return { data: result, error: null }
  } catch (error) {
    console.error('Error creating category:', error)
    return { data: null, error }
  }
}

export async function updateCategory(id, updates) {
  const client = getClient()
  try {
    const result = await client.patch(id).set(updates).commit()
    return { data: result, error: null }
  } catch (error) {
    console.error('Error updating category:', error)
    return { data: null, error }
  }
}
