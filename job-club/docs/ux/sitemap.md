# Job Club Sitemap

## Site Structure
```
Introduction (/)                    ← 3D Cube Landing
│
├── Home (/home/)                   ← Main Homepage with Video
│
├── Join (/join/)
│   └── Success State (shown after form submit)
│
├── Events (/events/)
│   └── Event Detail (/events/[slug]/)
│
├── Resources (/resources/)
│   └── Resource Detail (/resources/[slug]/)
│
├── Privacy Policy (/privacy/)
│
└── Discord (External)              ← External Link
```

---

## Navigation Structure

### Main Navigation (Header - Cube Menu)

| Item | URL | Icon | Description |
|------|-----|------|-------------|
| Logo | `/` | - | Returns to Introduction |
| Home | `/home/` | 🏠 | Main homepage with hero video |
| Events | `/events/` | 📅 | Event listings from Sanity |
| Resources | `/resources/` | 📚 | Resource library |
| Join | `/join/` | 🚀 | Onboarding form |
| Privacy | `/privacy/` | 🔒 | Privacy policy |
| Introduction | `/` | ✦ | 3D cube intro page |
| Discord | External | 💬 | Community Discord server |

### Footer Navigation

1. **Copyright** → Static text
2. **Privacy Policy** → `/privacy/`

---

## Page Inventory

| Page | URL | Template | Purpose | Priority |
|------|-----|----------|---------|----------|
| Introduction | `/` | `intro.njk` | 3D cube landing, first impression | P0 |
| Home | `/home/` | `index.njk` | Value prop, hero video, CTAs | P0 |
| Join | `/join/` | `join.njk` | Onboarding form | P0 |
| Events | `/events/` | `events.njk` | Event listings | P0 |
| Event Detail | `/events/[slug]/` | `event-detail.njk` | Individual event info | P1 |
| Resources | `/resources/` | `resources.njk` | Resource library + portfolio guidance | P0 |
| Resource Detail | `/resources/[slug]/` | `resource-detail.njk` | Individual resource/guide | P1 |
| Privacy | `/privacy/` | `privacy.njk` | GDPR compliance, legal | P0 |

---

## Content Sources

| Page | Data Source | Dynamic? |
|------|-------------|----------|
| Introduction | Static | No |
| Home | Static + Events preview | Partial |
| Join | Static form → Sanity API | Form submission |
| Events | Sanity CMS (`events.js` with `events.json` fallback) | Yes |
| Event Detail | Sanity CMS | Yes |
| Resources | Sanity CMS (`resources.js` with `resources.json` fallback) | Yes |
| Resource Detail | Sanity CMS | Yes |
| Privacy | Static | No |

---

## User Flows

### Primary Flow: New Student Onboarding
```
Introduction (/) 
    → Click "Get Started"
    → Home (/home/) 
    → Click "Join Now" 
    → Join (/join/) 
    → Fill form & submit 
    → Success message 
    → Discord intro posted
    → Email with checklist sent
```

### Secondary Flow: Event Discovery
```
Home (/home/) 
    → Click "Events" 
    → Events (/events/) 
    → Click event card 
    → Event Detail (/events/[slug]/) 
    → Register / Add to calendar
```

### Secondary Flow: Resource Access
```
Home (/home/) 
    → Click "Resources" 
    → Resources (/resources/) 
    → Browse guides 
    → Click resource 
    → Resource Detail (/resources/[slug]/)
```

---

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/submit-form` | POST | Process onboarding form submissions |
| `/api/sanity-webhook` | POST | Receive Sanity publish events |

---

## External Integrations

| Service | Purpose | Trigger |
|---------|---------|---------|
| Sanity CMS | Content management | Build-time fetch |
| Airtable | CRM / Member database | Form submission |
| Zapier | Automation orchestration | Form submission, Sanity publish |
| Discord | Community & notifications | Via Zapier |
| Plausible | Analytics (GDPR-compliant) | After cookie consent |

---

## Layouts

| Layout | Template | Used By |
|--------|----------|---------|
| Base | `layouts/base.njk` | Most pages |
| Intro | `layouts/intro.njk` | Introduction page only |

---

## Components

| Component | File | Used On |
|-----------|------|---------|
| Navbar | `components/navbar.njk` | All pages (via base layout) |
| Footer | `components/footer.njk` | All pages (via base layout) |
| Cookie Banner | `components/cookie-banner.njk` | All pages (via base layout) |
| Event Card | `components/event-card.njk` | Events, Home |
| Resource Card | `components/resource-card.njk` | Resources, Home |
| Cube Nav | `components/cube-nav.njk` | Header navigation |
