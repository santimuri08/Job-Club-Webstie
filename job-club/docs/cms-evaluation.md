# CMS Evaluation

## Overview
Evaluating headless CMS options for Job Club to manage events, resources, and member profiles.

---

## CMS Options Evaluated

### 1. Sanity (Required)

| Criteria | Rating | Notes |
|----------|--------|-------|
| Data Modeling | ⭐⭐⭐⭐⭐ | Flexible schema with custom types |
| API/Querying | ⭐⭐⭐⭐⭐ | GROQ query language is powerful |
| Developer Experience | ⭐⭐⭐⭐ | Good docs, active community |
| Editorial Workflow | ⭐⭐⭐⭐ | Draft/publish, real-time collab |
| Pricing | ⭐⭐⭐⭐ | Generous free tier |
| Eleventy Integration | ⭐⭐⭐⭐ | Easy via API fetch |

**Pros:**
- Highly flexible schema
- Real-time collaboration
- Generous free tier (100K API requests/month)
- Great developer experience
- GROQ query language is intuitive

**Cons:**
- Learning curve for GROQ
- Requires JavaScript build step for Studio

---

### 2. Strapi

| Criteria | Rating | Notes |
|----------|--------|-------|
| Data Modeling | ⭐⭐⭐⭐ | Good content type builder |
| API/Querying | ⭐⭐⭐ | REST or GraphQL |
| Developer Experience | ⭐⭐⭐ | Requires self-hosting setup |
| Editorial Workflow | ⭐⭐⭐ | Basic draft system |
| Pricing | ⭐⭐⭐⭐⭐ | Free (self-hosted) |
| Eleventy Integration | ⭐⭐⭐ | Standard REST API |

**Pros:**
- Free and open source
- Self-hosted (data ownership)
- Visual content type builder
- REST and GraphQL APIs

**Cons:**
- Requires hosting/maintenance
- Heavier setup than Sanity
- Less polished editorial experience

---

### 3. Contentful

| Criteria | Rating | Notes |
|----------|--------|-------|
| Data Modeling | ⭐⭐⭐⭐ | Good content modeling |
| API/Querying | ⭐⭐⭐⭐ | REST and GraphQL |
| Developer Experience | ⭐⭐⭐⭐ | Well documented |
| Editorial Workflow | ⭐⭐⭐⭐⭐ | Excellent UX |
| Pricing | ⭐⭐ | Free tier limited |
| Eleventy Integration | ⭐⭐⭐⭐ | Good SDK support |

**Pros:**
- Polished editorial experience
- Strong enterprise features
- Good documentation

**Cons:**
- Expensive beyond free tier
- Limited free tier (25K records)
- Less flexible than Sanity

---

## Comparison Table

| Feature | Sanity | Strapi | Contentful |
|---------|--------|--------|------------|
| Pricing | Free tier (generous) | Free (self-host) | Free tier (limited) |
| Hosting | Managed | Self-hosted | Managed |
| Query Language | GROQ | REST/GraphQL | REST/GraphQL |
| Real-time | Yes | Plugin needed | Yes |
| Schema Flexibility | Excellent | Good | Good |
| Best For | Our project ✅ | Budget projects | Enterprise |

---

## Final Selection: Sanity

### Justification:

1. **Flexible Schema**: Perfect for our memberProfile, event, and resource types
2. **Generous Free Tier**: 100K API requests/month covers our needs
3. **Real-time Collaboration**: Team can edit simultaneously
4. **GROQ Queries**: Powerful filtering for events by date
5. **Webhook Support**: Essential for Zapier/Make automation
6. **Great DX**: Modern Studio, good docs

### Schemas We'll Create (Backend Partner):
- `memberProfile` - Student onboarding data
- `event` - Workshops, meetups
- `resource` - Guides and articles
- `author` - Resource authors

---

## Integration Plan

**Frontend (My Job)**:
1. Create mock JSON data matching Sanity schema
2. Build pages using mock data
3. When backend ready, switch to fetch from Sanity API

**Backend (Partner's Job)**:
1. Set up Sanity Studio
2. Create schemas
3. Provide API credentials
4. Set up webhooks for automation