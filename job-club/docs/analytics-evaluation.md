# Analytics Evaluation

## Overview
Evaluating analytics tools for Job Club with focus on GDPR compliance, ease of use, and Eleventy integration.

---

## Tools Evaluated

### 1. Google Analytics 4 (GA4)

| Criteria | Rating | Notes |
|----------|--------|-------|
| GDPR Compliance | ⚠️ Medium | Requires consent banner, supports consent mode |
| Cookies Required | Yes | Multiple tracking cookies |
| Cost | Free | No cost |
| Setup Complexity | Medium | Requires account, configuration |
| Eleventy Integration | Good | Script tag in layout |

**Pros:**
- Free and powerful
- Detailed user behavior tracking
- Widely used (documentation available)
- Real-time reporting

**Cons:**
- Privacy concerns (data goes to Google)
- Requires consent before loading
- More complex than needed for our use case
- May be blocked by ad blockers

---

### 2. Plausible Analytics

| Criteria | Rating | Notes |
|----------|--------|-------|
| GDPR Compliance | ✅ High | Can run cookieless, privacy-focused |
| Cookies Required | Optional | Cookieless mode available |
| Cost | $9/month | Or self-hosted free |
| Setup Complexity | Easy | Single script tag |
| Eleventy Integration | Excellent | Minimal code |

**Pros:**
- Privacy-focused by design
- Lightweight (<1KB script)
- Simple dashboard
- Can run without consent in cookieless mode
- EU-owned company

**Cons:**
- Monthly cost ($9/mo)
- Less detailed than GA4
- No free hosted option

---

## Comparison Table

| Feature | GA4 | Plausible |
|---------|-----|-----------|
| Price | Free | $9/month |
| GDPR Friendly | Requires consent | Built-in compliance |
| Cookie-free option | No | Yes |
| Script size | ~28KB | <1KB |
| Setup time | 30+ min | 5 min |
| Dashboard complexity | High | Simple |
| Data ownership | Google | You |

---

## Recommendation

**Selected: Plausible Analytics**

### Reasons:
1. **GDPR Compliance**: Can run without cookies/consent banner
2. **Simplicity**: Single script, simple dashboard
3. **Performance**: Tiny script size (good for Lighthouse scores)
4. **Privacy**: Data stays private, EU-based

### Alternative if budget is concern:
Use GA4 with consent mode, load only after user accepts cookies.

---

## Implementation Plan

### With Plausible (Recommended):
Plausible is loaded **only after consent** via `src/js/cookie-consent.js`.

- Configure the domain in `src/_data/site.json`:

```json
{
  "analyticsDomain": "your-domain.com"
}
```

- The layouts set a `data-analytics-domain` attribute on `<html>`.
- After the user accepts analytics, the Plausible script is injected dynamically.

### With GA4 (If free required):
```javascript
// Load only after consent
function loadAnalytics() {
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
}
```

---

## Events to Track

1. **Page Views** - Automatic
2. **Onboarding Form Views** - Custom event on /join/ page
3. **Form Submissions** - Custom event on submit
4. **Event Clicks** - Track clicks on event cards
5. **Resource Downloads** - Track resource access