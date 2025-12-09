# QA Report

## Date
[Insert date]

## Tester
[Your name]

---

## Lighthouse Scores

### Homepage (/)
| Metric | Score | Status |
|--------|-------|--------|
| Performance | [XX] | [✅/⚠️/❌] |
| Accessibility | [XX] | [✅/⚠️/❌] |
| Best Practices | [XX] | [✅/⚠️/❌] |
| SEO | [XX] | [✅/⚠️/❌] |

[Insert screenshot]

### Join Page (/join/)
| Metric | Score | Status |
|--------|-------|--------|
| Performance | [XX] | [✅/⚠️/❌] |
| Accessibility | [XX] | [✅/⚠️/❌] |
| Best Practices | [XX] | [✅/⚠️/❌] |
| SEO | [XX] | [✅/⚠️/❌] |

[Insert screenshot]

### Events Page (/events/)
| Metric | Score | Status |
|--------|-------|--------|
| Performance | [XX] | [✅/⚠️/❌] |
| Accessibility | [XX] | [✅/⚠️/❌] |
| Best Practices | [XX] | [✅/⚠️/❌] |
| SEO | [XX] | [✅/⚠️/❌] |

[Insert screenshot]

---

## Bundle Size

| Asset | Size | Gzipped | Target | Status |
|-------|------|---------|--------|--------|
| main.css | [XX]KB | [XX]KB | <10KB | [✅/❌] |
| cookie-consent.js | [XX]KB | [XX]KB | <5KB | [✅/❌] |
| form-validation.js | [XX]KB | [XX]KB | <5KB | [✅/❌] |

---

## Playwright Test Results

| Test Suite | Pass | Fail | Status |
|------------|------|------|--------|
| Homepage | [X] | [X] | [✅/❌] |
| Form | [X] | [X] | [✅/❌] |

**Total: [X] passed, [X] failed**

[Insert CI screenshot or test output]

---

## Manual Accessibility Testing

### Keyboard Navigation
- [ ] Can tab through all interactive elements
- [ ] Focus indicators are visible
- [ ] Skip link works
- [ ] Forms are navigable with keyboard only

**Notes:** [Add any issues found]

### Screen Reader Testing
- [ ] Tested with [VoiceOver/NVDA/Narrator]
- [ ] All images have alt text
- [ ] Form fields are properly labeled
- [ ] Headings are in logical order
- [ ] ARIA labels are descriptive

**Notes:** [Add any issues found]

### Color Contrast
- [ ] Text meets WCAG AA standards (4.5:1 for normal text)
- [ ] Large text meets 3:1 ratio
- [ ] Interactive elements are distinguishable

**Notes:** [Add any issues found]

---

## Cookie Banner Testing

| Test | Expected | Result |
|------|----------|--------|
| Appears on first visit | Banner shows | [✅/❌] |
| Accept button hides banner | Banner hidden | [✅/❌] |
| Reject button hides banner | Banner hidden | [✅/❌] |
| Accept stores consent | localStorage set to 'accepted' | [✅/❌] |
| Reject stores consent | localStorage set to 'rejected' | [✅/❌] |
| Doesn't show on return visit | Banner stays hidden | [✅/❌] |
| Analytics load after accept | Console shows "Analytics loaded" | [✅/❌] |

---

## Form Validation Testing

| Test | Expected | Result |
|------|----------|--------|
| Empty form submit | Shows errors for required fields | [✅/❌] |
| Invalid email format | Shows email error | [✅/❌] |
| Invalid URL format | Shows URL error | [✅/❌] |
| Valid form submission | Shows success message | [✅/❌] |
| Real-time validation | Errors clear on input | [✅/❌] |

---

## CI/CD Pipeline

| Check | Status |
|-------|--------|
| Linting passes | [✅/❌] |
| Build succeeds | [✅/❌] |
| Tests pass | [✅/❌] |
| Lighthouse CI | [✅/⚠️/❌] |
| Deploy triggers | [✅/❌] |

[Insert GitHub Actions screenshot]

---

## Issues Found & Fixed

| Issue | Page | Severity | Status |
|-------|------|----------|--------|
| [Description] | [Page] | [High/Medium/Low] | [Fixed/Open] |

---

## Final Checklist

- [ ] All Lighthouse scores ≥90
- [ ] All Playwright tests passing
- [ ] Cookie banner functional
- [ ] Form validation working
- [ ] Mobile responsive
- [ ] Keyboard accessible
- [ ] CI/CD pipeline green
- [ ] Site deploys successfully