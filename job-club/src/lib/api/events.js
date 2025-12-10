import { fetchQuery, eventProjection } from '../sanity'

export async function getUpcomingEvents(limit = 10) {
  const query = `*[_type == "event" && dateTime(now()) <= dateTime(^dateTime)] | order(dateTime asc)[0...$limit] ${eventProjection}`
  return fetchQuery(query, { limit })
}

export async function getPastEvents(limit = 10) {
  const query = `*[_type == "event" && dateTime(now()) > dateTime(^dateTime)] | order(dateTime desc)[0...$limit] ${eventProjection}`
  return fetchQuery(query, { limit })
}

export async function getEventBySlug(slug) {
  const query = `*[_type == "event" && slug.current == $slug][0] ${eventProjection}`
  return fetchQuery(query, { slug })
}

export async function getEventsByType(eventType, limit = 5) {
  const query = `*[_type == "event" && eventType == $eventType] | order(dateTime asc)[0...$limit] ${eventProjection}`
  return fetchQuery(query, { eventType, limit })
}

export async function searchEvents(searchTerm, limit = 10) {
  const query = `*[_type == "event" && (
    title match $searchTerm ||
    description match $searchTerm ||
    eventType match $searchTerm
  )] | order(dateTime asc)[0...$limit] ${eventProjection}`
  
  return fetchQuery(query, { searchTerm: `*${searchTerm}*`, limit })
}
