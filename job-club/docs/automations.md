# Automations (Zapier + Webhooks)

## Overview

This project sends two primary automation events to Zapier via `ZAPIER_WEBHOOK_URL`:

- Onboarding form submissions (join flow)
- Sanity publish/update webhooks (events/resources announcements)

All automations are routed through a single Zapier **Catch Hook** trigger.

---

## 1) Join form → Zapier

### Trigger

- **Source**: Vercel API route
- **Endpoint**: `POST /api/submit-form`
- **Zapier trigger**: Webhooks by Zapier → **Catch Hook**

### Payload shape (important fields)

- `type`: `onboarding_submission`
- `name`
- `email`
- `careerGoal` (enum; good for filters)
- `careerGoalLabel` (human-friendly; use in messages)
- `socialLinks.linkedin`
- `socialLinks.github`
- `socialLinks.portfolio`
- `socialLinks.calendly`
- `missingPrerequisites.linkedin` (boolean)
- `missingPrerequisites.github` (boolean)
- `missingPrerequisites.portfolio` (boolean)
- `missingPrerequisites.calendly` (boolean)

### Discord intro step

Use `careerGoalLabel` in the message:

- **Message**:
  - `Welcome {{name}}! They're interested in {{careerGoalLabel}}.`

### Email checklist step (recommended: Code by Zapier)

Add a step **Code by Zapier (JavaScript)** before the email.

**Input Data** (map from the Catch Hook):

- `missingLinkedin` ← `missingPrerequisites.linkedin`
- `missingGithub` ← `missingPrerequisites.github`
- `missingPortfolio` ← `missingPrerequisites.portfolio`
- `missingCalendly` ← `missingPrerequisites.calendly`

**Code**:

```javascript
const toBool = (v) => v === true || String(v).toLowerCase() === 'true' || v === '1' || v === 1;

const items = [];
if (toBool(inputData.missingLinkedin)) {
  items.push('- Create or update your LinkedIn profile: https://www.linkedin.com/help/');
}
if (toBool(inputData.missingGithub)) {
  items.push('- Create or update your GitHub profile: https://docs.github.com/en/get-started');
}
if (toBool(inputData.missingPortfolio)) {
  items.push('- Build a simple portfolio site: https://kaw393939.github.io/117_final_fall_2025/portfolio/');
}
if (toBool(inputData.missingCalendly)) {
  items.push('- Set up your Calendly link: https://calendly.com/');
}

const checklistText = items.length
  ? `Here’s your personalized checklist:\n${items.join('\n')}`
  : 'Great — you’ve provided all prerequisites for onboarding!';

return {
  checklistText,
  hasMissing: items.length > 0 ? 'true' : 'false'
};
```

Then use the output `checklistText` in your email body.

---

## 2) Sanity → Zapier → Discord announcements

### Sanity webhook

- **Endpoint**: `POST /api/sanity-webhook`
- **Secret**: set `SANITY_WEBHOOK_SECRET` in Vercel and use the same secret in the Sanity webhook settings
- **Behavior**: verifies signature (if configured) and forwards a normalized payload to Zapier

### Payload shape

- `type`: `sanity_webhook`
- `normalized.docType`: e.g. `event` or `resource`
- `normalized.docId`
- `payload`: original Sanity webhook payload

### Zapier routing

Use **Paths** to route based on `normalized.docType`:

- If `normalized.docType` equals `event` → POST to Discord #events webhook
- If `normalized.docType` equals `resource` → POST to Discord #resources webhook

---

## Required third-party settings

- **Vercel**
  - Env vars: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_WRITE_TOKEN`, `SANITY_WEBHOOK_SECRET`, `ZAPIER_WEBHOOK_URL`, optional Airtable vars
- **Zapier**
  - Webhooks by Zapier Catch Hook URL saved as `ZAPIER_WEBHOOK_URL`
- **Discord**
  - One webhook per channel (#jobclub-intros, #events, #resources)
- **Sanity**
  - Webhook URL: `https://<your-vercel-domain>/api/sanity-webhook`
  - Webhook secret matches `SANITY_WEBHOOK_SECRET`
