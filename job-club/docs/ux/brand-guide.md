# Job Club Brand Guide

## Logo

**Primary Logo:** Text-based "Job Club" with cube icon
- Font: Outfit, Bold (800 weight)
- "Job" in white, "Club" in red accent

**Usage:**
- Minimum size: 100px wide
- Clear space: Equal to height of "J"
- Don't stretch, rotate, or recolor

---

## Color Palette

### Primary Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Primary Red | #DC2626 | --color-primary | Buttons, links, accents, CTAs |
| Primary Dark | #B91C1C | --color-primary-dark | Hover states |
| Primary Light | #EF4444 | --color-primary-light | Highlights |
| Primary Lighter | #FEE2E2 | --color-primary-lighter | Subtle backgrounds |

### Background Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Black | #000000 | --color-black | Main background |
| Dark | #0A0A0A | --color-dark | Alternate sections |
| Dark Soft | #111111 | --color-dark-soft | Card backgrounds |

### Neutral Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Gray 900 | #171717 | --color-gray-900 | Cards, inputs |
| Gray 800 | #262626 | --color-gray-800 | Borders, dividers |
| Gray 700 | #404040 | --color-gray-700 | Secondary borders |
| Gray 600 | #525252 | --color-gray-600 | Muted text |
| Gray 500 | #737373 | --color-gray-500 | Placeholder text |
| Gray 400 | #A3A3A3 | --color-gray-400 | Secondary text |
| Gray 300 | #D4D4D4 | --color-gray-300 | Body text |
| Gray 200 | #E5E5E5 | --color-gray-200 | Light text |
| Gray 100 | #F5F5F5 | --color-gray-100 | Highlights |
| White | #FFFFFF | --color-white | Primary text, headings |

### CSS Variables
```css
:root {
  --color-primary: #DC2626;
  --color-primary-dark: #B91C1C;
  --color-primary-light: #EF4444;
  --color-primary-lighter: #FEE2E2;
  --color-black: #000000;
  --color-dark: #0A0A0A;
  --color-dark-soft: #111111;
  --color-gray-900: #171717;
  --color-gray-800: #262626;
  --color-gray-700: #404040;
  --color-gray-600: #525252;
  --color-gray-500: #737373;
  --color-gray-400: #A3A3A3;
  --color-gray-300: #D4D4D4;
  --color-gray-200: #E5E5E5;
  --color-gray-100: #F5F5F5;
  --color-gray-50: #FAFAFA;
  --color-white: #FFFFFF;
}
```

---

## Typography

### Font Families
- **Display/Headings:** Outfit
- **Body Text:** DM Sans
- **Fallback:** -apple-system, BlinkMacSystemFont, sans-serif

### Type Scale

| Element | Size | Weight | Line Height | Font |
|---------|------|--------|-------------|------|
| H1 | clamp(2.5rem, 6vw, 4rem) | 800 | 1.1 | Outfit |
| H2 | clamp(2rem, 5vw, 3rem) | 700 | 1.2 | Outfit |
| H3 | 1.5rem | 600 | 1.3 | Outfit |
| H4 | 1.25rem | 600 | 1.3 | Outfit |
| Body | 1rem | 400 | 1.6 | DM Sans |
| Body Large | 1.1rem | 400 | 1.6 | DM Sans |
| Small | 0.875rem | 400 | 1.5 | DM Sans |
| Eyebrow | 0.75rem | 600 | 1.2 | DM Sans |

### CSS Variables
```css
:root {
  --font-display: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

---

## Voice & Tone

### Voice Characteristics
- **Professional** but approachable
- **Encouraging** and supportive
- **Clear** and direct
- **Student-friendly** (avoid jargon)
- **Action-oriented** (focus on outcomes)

### Do's
✅ "Launch your AI career"
✅ "Get your personalized checklist"
✅ "Join 100+ NJIT students"
✅ "Build your portfolio today"
✅ "Connect with mentors"

### Don'ts
❌ "Leverage synergies"
❌ "Utilize our platform"
❌ "Optimize your deliverables"
❌ Overly casual ("yo", "gonna", "sup")
❌ Condescending ("it's easy", "anyone can do it")

---

## Button Styles

### Primary Button (CTA)
```css
.btn-primary {
  background: var(--color-primary);      /* #DC2626 */
  color: var(--color-white);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--color-primary-dark); /* #B91C1C */
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
}
```

### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--color-white);
  border: 2px solid var(--color-gray-600);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
}

.btn-secondary:hover {
  border-color: var(--color-white);
  background: rgba(255, 255, 255, 0.05);
}
```

### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--color-gray-300);
  border: 2px solid var(--color-gray-700);
}

.btn-ghost:hover {
  border-color: var(--color-gray-500);
  color: var(--color-white);
}
```

### Glowing Button (Hero CTA)
```css
.btn-glow {
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.4);
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.4); }
  50% { box-shadow: 0 0 35px rgba(220, 38, 38, 0.6); }
}
```

---

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| --transition-fast | 150ms | Micro-interactions |
| --transition-base | 300ms | Standard transitions |
| --transition-slow | 500ms | Page transitions |

| Spacing | Value | Usage |
|---------|-------|-------|
| xs | 0.25rem (4px) | Tight spacing |
| sm | 0.5rem (8px) | Small gaps |
| md | 1rem (16px) | Default spacing |
| lg | 1.5rem (24px) | Section padding |
| xl | 2rem (32px) | Large gaps |
| 2xl | 3rem (48px) | Section separation |
| 3xl | 4rem (64px) | Major sections |

---

## Component Samples

### Card
```css
.card {
  background: var(--color-gray-900);
  border: 1px solid var(--color-gray-800);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--color-primary);
  transform: translateY(-4px);
}
```

### Form Input
```css
.form-input {
  width: 100%;
  padding: 1rem;
  background: var(--color-gray-900);
  border: 2px solid var(--color-gray-700);
  border-radius: 10px;
  color: var(--color-white);
  transition: border-color 0.15s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-input.error {
  border-color: var(--color-primary);
  background-color: rgba(220, 38, 38, 0.05);
}
```

### Navigation
```css
.page-header {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-gray-800);
  padding: 1.5rem 2rem;
}
```

---

## Icon Style

- **Style:** Stroke-based (not filled)
- **Stroke Width:** 2px
- **Size:** 20px (navigation), 24px (cards), 48px (features)
- **Color:** Inherit from parent (uses currentColor)

### Example SVG Icon
```html
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
     fill="none" stroke="currentColor" stroke-width="2" 
     stroke-linecap="round" stroke-linejoin="round">
  <path d="..."></path>
</svg>
```

---

## Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile | < 480px | Small phones |
| Mobile Large | < 768px | Large phones, small tablets |
| Tablet | < 1024px | Tablets, small laptops |
| Desktop | ≥ 1024px | Laptops, desktops |
```css
/* Mobile first approach */
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px) { /* Mobile Large */ }
@media (max-width: 480px) { /* Mobile */ }
@media (max-width: 360px) { /* Extra Small */ }
```

---

## Accessibility Standards

1. **Color Contrast:** All text meets WCAG AA (4.5:1 minimum)
2. **Focus States:** Visible focus indicators on all interactive elements
3. **Skip Link:** Present for keyboard navigation
4. **ARIA Labels:** All buttons and inputs have accessible names
5. **Heading Hierarchy:** Logical h1 → h2 → h3 structure
6. **Alt Text:** All images have descriptive alt text
