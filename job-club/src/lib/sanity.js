import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Initialize Sanity client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'ksy6ugx5',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: process.env.SANITY_API_VERSION || '2023-05-03',
})

// Image URL builder
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Helper function to fetch data with error handling
export async function fetchQuery(query, params = {}) {
  try {
    const data = await client.fetch(query, params)
    return { data, error: null }
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return { data: null, error }
  }
}

// Get client with write permissions
export function getClient() {
  return createClient({
    projectId: process.env.SANITY_PROJECT_ID || 'ksy6ugx5',
    dataset: process.env.SANITY_DATASET || 'production',
    useCdn: false,
    apiVersion: process.env.SANITY_API_VERSION || '2023-05-03',
    token: process.env.SANITY_WRITE_TOKEN
  })
}

// Common GROQ projections
export const eventProjection = `{
  _id,
  title,
  slug,
  description,
  eventType,
  dateTime,
  location,
  "zoomUrl": zoomLink,
  "registrationUrl": registrationLink,
  speakers,
  maxAttendees,
  currentAttendees,
  recurrence,
  "featuredImage": featuredImage.asset->url,
  publishedAt
}`

export const memberProjection = `{
  _id,
  name,
  email,
  bio,
  careerGoal,
  status,
  joinDate,
  lastActive,
  socialLinks,
  skills,
  interests,
  "profileImage": profileImage.asset->url,
  flags
}`
