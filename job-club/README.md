# Job Club Website

This is the Job Club website built with Eleventy (11ty) and deployed on Vercel.

## Key Features

- Join/onboarding form that writes member profiles to Sanity via `POST /api/submit-form`
- Events and resources pulled from Sanity at build time (with JSON fallback)
- GDPR cookie consent banner with consent-gated Plausible analytics
- Zapier automation hooks for onboarding and Sanity publish announcements

## Local Development

### 1) Install

```bash
npm install
```

### 2) Configure environment variables

Copy and fill:

```bash
cp .env.example .env
```

Required for form submissions:

- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_WRITE_TOKEN`

### 3) Run

```bash
npm start
```

### 4) Build

```bash
npm run build
```

## Deployment

- Hosted on Vercel.
- See:
  - `docs/backend-integration.md`
  - `docs/automations.md`
  - `docs/third-party-setup.md`

## API Routes

- `POST /api/submit-form`
- `POST /api/sanity-webhook`
