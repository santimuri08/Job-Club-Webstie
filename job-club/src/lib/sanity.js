import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Initialize the client
const config = {
  projectId: import.meta.env.SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET || process.env.SANITY_DATASET || 'production',
  apiVersion: import.meta.env.SANITY_API_VERSION || process.env.SANITY_API_VERSION || '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_WRITE_TOKEN,
}

export const client = createClient(config)

// Image URL builder
export const imageBuilder = imageUrlBuilder(client)

export const urlFor = (source) => imageBuilder.image(source)

// Helper function to fetch data with error handling
export async function fetchQuery(query, params = {}) {
  try {
    const result = await client.fetch(query, params)
    return { data: result, error: null }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { data: null, error }
  }
}

// Helper to get client with write access
export function getClient(preview = false) {
  return preview 
    ? client.withConfig({
        token: process.env.SANITY_WRITE_TOKEN,
        useCdn: false,
        ignoreBrowserTokenWarning: true,
      })
    : client
}

// Common projection fields for events
export const eventProjection = `{
  _id,
  _type,
  title,
  slug,
  description,
  eventType,
  startDateTime,
  endDateTime,
  location,
  "featuredImage": featuredImage.asset->url,
  registrationRequired,
  registrationLink,
  "speakers": speakers[]->{
    name,
    role,
    "image": profileImage.asset->url,
    socialLinks
  },
  maxAttendees,
  tags
}`

// Common projection for member profiles
export const memberProjection = `{
  _id,
  name,
  email,
  careerGoal,
  status,
  "profileImage": profileImage.asset->url,
  bio,
  socialLinks,
  skills,
  joinDate,
  lastActive,
  isAdmin
}`
