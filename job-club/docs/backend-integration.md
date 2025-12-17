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

## Data Fetching

### Frontend Data Files

- `src/_data/events.js` - Fetches events from Sanity
- `src/_data/resources.js` - Fetches resources and categories
- `src/_data/members.js` - Fetches member data

### API Utilities

Located in `src/lib/api/`:

- `events.js` - Event-related queries
- `resources.js` - Resource-related queries
- `members.js` - Member profile queries
- `categories.js` - Category queries
- `forms.js` - Form submission handlers

### Example Usage

```javascript
// Fetch upcoming events
import { getUpcomingEvents } from './lib/api/events'

const { data: events, error } = await getUpcomingEvents(10)
```

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

### Netlify
1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main

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
