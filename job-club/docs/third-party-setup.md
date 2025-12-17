# Third-Party Setup Checklist (Production)

This checklist centralizes all external services needed to run the Job Club site end-to-end.

---

## Vercel

### Project settings

- Root directory: `job-club`
- Build command: `npm run build`
- Output directory: `_site`

### Environment variables

- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_WRITE_TOKEN` (secret)
- `SANITY_WEBHOOK_SECRET` (secret)
- `ZAPIER_WEBHOOK_URL` (secret)
- `CORS_ALLOW_ORIGIN` (recommend setting to your real domain)

Optional (CRM):

- `AIRTABLE_PAT` (preferred) or `AIRTABLE_API_KEY` (secret)
- `AIRTABLE_BASE_ID`
- `AIRTABLE_TABLE_NAME`

Optional (analytics):

- Set `analyticsDomain` in `src/_data/site.json` (not an env var)

---

## Sanity

### CORS

In Sanity project settings:

- Add your Vercel domain(s) to CORS allowed origins.

### API tokens

- Create a token with permissions to write to the dataset used by `memberProfile`.
- Add it to Vercel as `SANITY_WRITE_TOKEN`.

### Webhook (publish/update → Zapier)

- Create a webhook pointing to:
  - `https://<your-vercel-domain>/api/sanity-webhook`
- Set the webhook secret to match `SANITY_WEBHOOK_SECRET`.

---

## Zapier

### Trigger

- App: Webhooks by Zapier
- Event: Catch Hook
- Copy the hook URL into Vercel as `ZAPIER_WEBHOOK_URL`.

### Paths

Use Paths by Zapier to route on the payload `type`:

- `type == onboarding_submission`
  - Discord intro post
  - Email onboarding checklist

- `type == sanity_webhook`
  - If `normalized.docType == event` → Discord #events
  - If `normalized.docType == resource` → Discord #resources

See `docs/automations.md` for field mapping and a ready-to-paste Code step.

---

## Discord

Create channels (suggested):

- `#jobclub-intros`
- `#events`
- `#resources`

Create one webhook per channel and paste those webhook URLs into the corresponding Zapier Webhook POST actions.

---

## Airtable (Optional CRM)

- Create a base and a table (default: `Members`).
- Set Vercel env vars:
  - `AIRTABLE_PAT` (or `AIRTABLE_API_KEY`)
  - `AIRTABLE_BASE_ID`
  - `AIRTABLE_TABLE_NAME`

If you want clean field mapping, ensure these columns exist:

- `Name`
- `Email`
- `Major`
- `GraduationYear`
- `CareerGoal`
- `LinkedIn`
- `GitHub`
- `Portfolio`
- `Calendly`
- `OnboardingStatus`
- `SubmittedAt`
- `MissingLinkedIn`
- `MissingGitHub`
- `MissingPortfolio`
- `MissingCalendly`
- `SanityMemberId`

---

## Plausible Analytics (Optional)

- Create a Plausible site for your domain.
- Set `analyticsDomain` in `src/_data/site.json`.
- Cookie banner gates loading Plausible until consent is given.
