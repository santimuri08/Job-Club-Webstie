# Job Club Sitemap

## Site Structure
Homepage (/)
│
├── Join (/join/)
│   └── Success State (shown after form submit)
│
├── Events (/events/)
│   └── Event Detail (/events/[slug]/)  [Future: dynamic pages]
│
├── Resources (/resources/)
│   └── Resource Detail (/resources/[slug]/)  [Future: dynamic pages]
│
└── Privacy Policy (/privacy/)
---

## Navigation Structure

### Main Navigation (Header)
1. **Logo** → Homepage
2. **Home** → /
3. **Join** → /join/
4. **Events** → /events/
5. **Resources** → /resources/
6. **CTA Button: "Get Started"** → /join/

### Footer Navigation
1. **Privacy Policy** → /privacy/
2. **Discord** → External link
3. **Contact** → Email or form (future)

---

## Page Inventory

| Page | URL | Purpose | Priority |
|------|-----|---------|----------|
| Homepage | / | Value prop, CTAs, preview | P0 |
| Join | /join/ | Onboarding form | P0 |
| Events | /events/ | Event listings | P0 |
| Resources | /resources/ | Resource library | P1 |
| Privacy | /privacy/ | Legal compliance | P0 |

---

## Content Sources

| Page | Data Source |
|------|-------------|
| Homepage | Static + Events preview |
| Join | Static form |
| Events | Sanity CMS (events.json mock) |
| Resources | Sanity CMS (resources.json mock) |
| Privacy | Static |