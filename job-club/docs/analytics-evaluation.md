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
| Features | ⭐⭐⭐⭐⭐ | Full-featured analytics |

**Pros:**
- Free and powerful
- Detailed user behavior tracking
- Widely used (documentation available)
- Real-time reporting
- Custom event tracking
- Integration with Google ecosystem

**Cons:**
- Privacy concerns (data goes to Google)
- Requires consent before loading
- May be blocked by ad blockers
- More complex dashboard

---

### 2. Plausible Analytics

| Criteria | Rating | Notes |
|----------|--------|-------|
| GDPR Compliance | ✅ High | Can run cookieless, privacy-focused |
| Cookies Required | Optional | Cookieless mode available |
| Cost | $9/month | Or self-hosted free |
| Setup Complexity | Easy | Single script tag |
| Eleventy Integration | Excellent | Minimal code |
| Features | ⭐⭐⭐ | Basic analytics only |

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
- Limited custom event tracking

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
| Custom Events | ✅ Excellent | ⚠️ Limited |
| Real-time | ✅ Yes | ✅ Yes |
| Free Tier | ✅ Unlimited | ❌ None |

---

## Final Selection: Google Analytics 4

### Reasons for Selection:

1. **Cost**: Free tier is unlimited - important for student organization budget
2. **Features**: Full custom event tracking for form views, event clicks, registrations
3. **Integration**: Works with existing Google tools team may use
4. **Documentation**: Extensive resources for troubleshooting
5. **Scalability**: Can grow with the organization without cost concerns

### GDPR Compliance Implementation:

We implemented GA4 with **conditional loading** to ensure GDPR compliance:

1. **Cookie Consent Banner**: Shows on first visit with Accept/Decline options
2. **Conditional Script Loading**: Analytics script only loads AFTER user clicks "Accept"
3. **No Tracking on Decline**: If user declines, no analytics scripts are loaded
4. **Consent Storage**: User preference stored in localStorage
5. **IP Anonymization**: Enabled in GA4 configuration

---

## Implementation Details

### Cookie Consent Code (`src/js/cookie-consent.js`)
```javascript
// Analytics only loads after consent
function loadGoogleAnalytics() {
  const measurementId = 'G-XXXXXXXXXX';
  
  // Load gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  
  // Initialize with privacy settings
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', measurementId, {
    'anonymize_ip': true,  // GDPR compliance
    'cookie_flags': 'SameSite=None;Secure'
  });
}

// Only called when user accepts cookies
acceptBtn.addEventListener('click', function() {
  setConsent(true);
  hideBanner();
  loadGoogleAnalytics(); // Load analytics ONLY after consent
});
```

---

## Events Tracked

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `page_view` | Every page load (after consent) | page_title, page_path |
| `onboarding_form_view` | Join page loads | event_category: Form |
| `form_submission` | Form successfully submitted | event_label: Form name |
| `event_click` | User clicks event card | event_label: Event title |
| `resource_click` | User clicks resource | resource_type, resource_title |

### Event Tracking Code
```javascript
// Track onboarding form view
window.trackOnboardingFormView = function() {
  window.trackEvent('onboarding_form_view', {
    event_category: 'Form',
    event_label: 'Join Form Viewed'
  });
};

// Track event clicks
window.trackEventClick = function(eventTitle, eventId) {
  window.trackEvent('event_click', {
    event_category: 'Events',
    event_label: eventTitle
  });
};
```

---

## Verification

### Testing Consent Flow:
1. ✅ Banner appears on first visit
2. ✅ Clicking "Accept" hides banner and loads analytics
3. ✅ Clicking "Decline" hides banner, NO analytics loaded
4. ✅ Return visits respect previous choice
5. ✅ Console shows "[Analytics] Google Analytics loaded after consent"

### Testing Event Tracking:
1. ✅ Page views tracked after consent
2. ✅ Form view event fires on /join/ page
3. ✅ Event clicks tracked when clicking event cards
4. ✅ No tracking occurs if user declined cookies

---

## Screenshot

[Insert GA4 Real-Time Dashboard screenshot showing tracked events]

---

## Conclusion

Google Analytics 4 with conditional loading provides:
- **Full GDPR compliance** through consent-based loading
- **Comprehensive tracking** of required events
- **Zero cost** for the organization
- **Scalability** for future growth

The implementation ensures no user data is collected without explicit consent, meeting all privacy requirements while still providing valuable analytics for improving the Job Club experience.