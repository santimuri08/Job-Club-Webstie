# Backend Integration Documentation

## Overview

This document explains how the Job Club website integrates with Sanity CMS for content management.

## Architecture

### Frontend (11ty)
- Static site generator
- Fetches data from Sanity during build
- Uses serverless functions for form submissions

### Backend (Sanity)
- Headless CMS for content
- Real-time content updates
- Image optimization and CDN

## Setup

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
# Sanity Configuration
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2023-05-03
SANITY_WRITE_TOKEN=your_write_token
```

### 2. Install Dependencies

```bash
npm install @sanity/client @sanity/image-url
```

### 3. Sanity Studio

The Sanity Studio is located in `backend/sanity/`. To run it:

```bash
cd backend/sanity
npm run dev
```

## API Endpoints

### Serverless Functions

#### Submit Join Form
- **URL**: `/api/submit-form`
- **Method**: POST
- **Body**: JSON with member profile data
- **Response**: Created member profile or error

#### Sanity Webhook (forward to automations)
- **URL**: `/api/sanity-webhook`
- **Method**: POST
- **Headers**: `x-sanity-signature: <HMAC sha256>` (optional if you set `SANITY_WEBHOOK_SECRET`)
- **Body**: Raw JSON payload from Sanity webhook
- **Behavior**: Verifies signature (if secret set), extracts document info, forwards to `ZAPIER_WEBHOOK_URL` with a normalized envelope

## Data Fetching

### Frontend Data Files

- `src/_data/events.js` - Fetches events from Sanity
- `src/_data/resources.js` - Fetches resources from Sanity

Both data files implement:

- A build-time fetch from Sanity (when `SANITY_PROJECT_ID`/`SANITY_DATASET` are configured)
- A fallback to the existing JSON data under `src/_data/*.json` if Sanity is not configured

## Content Models

### Member Profile
- Personal information
- Social links
- Career goals
- Skills and interests

### Event
- Event details
- Location (physical/virtual)
- Registration information
- Speakers/presenters

### Resource
- Content (text, images, code)
- Categories and tags
- Author information
- Related resources

### Category
- Hierarchical structure
- SEO metadata
- Visual styling options

## Deployment

### Vercel
1. Import your repository into Vercel
2. Project settings:
   - Framework preset: Other (Eleventy autodetect works too)
   - Build command: `npm run build`
   - Output directory: `_site`
   - Root directory: `job-club`
3. Environment variables (Production/Preview):
   - `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_WRITE_TOKEN`
   - `SANITY_WEBHOOK_SECRET` (to verify Sanity signatures)
   - `ZAPIER_WEBHOOK_URL` (Zapier Catch Hook URL)
   - `AIRTABLE_PAT` (or `AIRTABLE_API_KEY`), `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME`
   - `CORS_ALLOW_ORIGIN`
4. Sanity → Webhook: point to `https://<your-vercel-domain>/api/sanity-webhook` and set the same secret
5. Deploy automatically on push to `main` (or enable GitHub Actions workflow for CI + optional deploy)

### Local Development
1. Install dependencies
2. Set up `.env` file
3. Run `npm start` for development server
4. Run `npm run build` for production build

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure Sanity CORS origins are configured
   - Check environment variables

2. **Build Failures**
   - Verify Sanity project ID and dataset
   - Check API token permissions

3. **Form Submissions**
   - Ensure write token is configured
   - Check serverless function logs

### Debug Mode

Enable debug logging by setting:
```env
DEBUG=sanity:*
```

## Performance Considerations

- Use CDN for static assets
- Implement caching for API responses
- Optimize images with Sanity's CDN
- Use GROQ projections to limit data transfer

## Security

- Never expose write tokens in frontend code
- Use environment variables for sensitive data
- Implement rate limiting for form submissions
- Validate all user inputs

## Next Steps

1. Set up authentication for member areas
2. Implement real-time updates
3. Add search functionality
4. Implement analytics tracking
5. Set up automated testing
