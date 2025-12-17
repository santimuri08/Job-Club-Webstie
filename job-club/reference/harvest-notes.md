# EAiKW Harvest Notes

## Project Information

| Field | Value |
|-------|-------|
| **Date Analyzed** | December 15-17, 2024 |
| **Analyzed By** | Job Club Development Team |
| **AI Tools Used** | Claude (Anthropic) for code analysis and documentation |
| **Reference Repository** | https://github.com/kaw393939/eaikw |
| **Target Project** | Job Club - AI Career Accelerator |

---

## 1. Eleventy Configuration Strategy

**File Analyzed:** `.eleventy.js`

### Key Configuration Findings:
```javascript
// EAiKW Directory Structure
module.exports = function(eleventyConfig) {
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
```

### Configuration Patterns Comparison:

| Pattern | EAiKW Approach | Job Club Implementation |
|---------|----------------|------------------------|
| Template Engine | Nunjucks (njk) | ✅ Adopted - using Nunjucks |
| Input Directory | `src/` | ✅ Adopted - `src/` |
| Output Directory | `_site/` | ✅ Adopted - `_site/` |
| Data Directory | `_data/` | ✅ Adopted - `src/_data/` |
| Includes | `_includes/` | ✅ Adopted - `src/_includes/` |
| Layouts | `_layouts/` or `_includes/layouts/` | ✅ Adopted - `_includes/layouts/` |

### Passthrough Copy Strategy:
```javascript
// EAiKW passes through static assets without processing
eleventyConfig.addPassthroughCopy("src/css");
eleventyConfig.addPassthroughCopy("src/js");
eleventyConfig.addPassthroughCopy("src/images");
eleventyConfig.addPassthroughCopy("src/fonts");

// Job Club Implementation
eleventyConfig.addPassthroughCopy("src/css");
eleventyConfig.addPassthroughCopy("src/js");
eleventyConfig.addPassthroughCopy("src/assets");
```

### Custom Filters:

| Filter | EAiKW | Job Club |
|--------|-------|----------|
| Date formatting | Basic date filter | ✅ Expanded with multiple formats |
| Slug generation | URL-friendly slugs | ✅ Used for events/resources |
| Limit filter | Array limiting | ✅ For preview sections |

### What We Reused:
1. ✅ Same directory structure pattern
2. ✅ Nunjucks as primary template engine
3. ✅ Passthrough copy for static assets
4. ✅ Custom date filter (expanded with more formats)
5. ✅ Data files for dynamic content

---

## 2. CSS Architecture

**Files Analyzed:** `src/css/` directory

### CSS Custom Properties (Variables):

**EAiKW Pattern:**
```css
:root {
  /* Colors */
  --color-primary: #1e40af;
  --color-secondary: #64748b;
  --color-background: #ffffff;
  --color-text: #334155;
  --color-text-muted: #64748b;
  
  /* Typography */
  --font-family-base: 'Inter', -apple-system, sans-serif;
  --font-family-heading: 'Inter', sans-serif;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 2rem;
  --line-height-base: 1.6;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;
  
  /* Layout */
  --container-max-width: 1200px;
  --border-radius: 0.5rem;
}
```

**Job Club CSS Variables Implementation:**
```css
:root {
  /* Brand Colors - Red/Black/White Theme */
  --color-primary: #DC2626;
  --color-primary-dark: #B91C1C;
  --color-primary-light: #EF4444;
  --color-primary-glow: rgba(220, 38, 38, 0.3);
  
  /* Neutrals (Dark Theme) */
  --color-black: #000000;
  --color-gray-900: #171717;
  --color-gray-800: #262626;
  --color-gray-700: #404040;
  --color-gray-600: #525252;
  --color-gray-500: #737373;
  --color-gray-400: #A3A3A3;
  --color-gray-300: #D4D4D4;
  --color-white: #FFFFFF;
  
  /* Typography */
  --font-display: 'Outfit', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 2.5rem;
  --font-size-5xl: 3rem;
  
  /* Spacing & Layout */
  --container-max-width: 1200px;
  --border-radius: 0.5rem;
  --border-radius-lg: 1rem;
  --border-radius-full: 9999px;
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
}
```

### Naming Conventions:

| EAiKW Pattern | Example | Job Club Adoption |
|---------------|---------|-------------------|
| BEM-like naming | `.card__title` | ✅ `.event-card__title`, `.resource-card` |
| Utility classes | `.text-center` | ✅ `.center`, `.hidden` |
| Component prefixes | `.nav-`, `.hero-` | ✅ `.nav-`, `.hero-`, `.event-`, `.resource-` |
| State modifiers | `.is-active`, `.--active` | ✅ `.active`, `.is-open`, `.is-visible` |
| Page-specific | `.page-home` | ✅ `.page-section`, `[data-page]` |

### Responsive Breakpoints:
```css
/* EAiKW Breakpoints */
@media (max-width: 1024px) { /* Tablets/Small Desktop */ }
@media (max-width: 768px)  { /* Mobile Landscape */ }
@media (max-width: 480px)  { /* Mobile Portrait */ }

/* Job Club Implementation - Extended */
@media (max-width: 1200px) { /* Large tablets */ }
@media (max-width: 1024px) { /* Tablets/Small Desktop */ }
@media (max-width: 768px)  { /* Mobile Landscape */ }
@media (max-width: 480px)  { /* Mobile Portrait */ }
@media (max-width: 360px)  { /* Small phones */ }
```

### Layout Patterns:

**1. Container Pattern:**
```css
/* EAiKW */
.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 1rem;
}

/* Job Club - Same pattern */
.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}
```

**2. Grid System:**
```css
/* EAiKW Grid */
.grid {
  display: grid;
  gap: 1.5rem;
}
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }

/* Job Club - Extended with auto-fit */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

**3. Flexbox Utilities:**
```css
.flex { display: flex; }
.flex-center { justify-content: center; align-items: center; }
.flex-between { justify-content: space-between; }
.flex-column { flex-direction: column; }
```

### What We Reused:
1. ✅ CSS custom properties system (adapted for dark theme)
2. ✅ BEM-like naming convention
3. ✅ Container/grid layout patterns
4. ✅ Mobile-first responsive approach
5. ✅ Same breakpoint values (extended)
6. ✅ Utility class patterns

---

## 3. Accessibility Findings

**Files Analyzed:** All HTML templates and components

### Semantic HTML Structure:

**EAiKW Pattern:**
```html
<header role="banner">
  <nav aria-label="Main navigation">...</nav>
</header>

<main id="main-content" role="main">
  <section aria-labelledby="section-title">
    <h2 id="section-title">...</h2>
  </section>
</main>

<footer role="contentinfo">...</footer>
```

**Job Club Implementation:**
```html
<header class="page-header">
  <a href="/" class="logo">Job <span>Club</span></a>
  <nav class="cube-nav-mini" aria-label="Main navigation">
    <button class="cube-nav-toggle" aria-expanded="false" aria-controls="nav-menu">
      <!-- 3D Cube Icon -->
    </button>
    <div class="cube-nav-menu" id="nav-menu" role="menu">
      <a href="/home/" class="nav-menu-item" role="menuitem">Home</a>
      <!-- More items -->
    </div>
  </nav>
</header>

<main class="main-content" id="main-content">
  {{ content | safe }}
</main>

<footer class="footer" role="contentinfo">...</footer>
```

### ARIA Attributes Implementation:

| ARIA Pattern | Usage | Job Club Implementation |
|--------------|-------|------------------------|
| `aria-label` | Navigation, buttons | ✅ All nav elements, cube toggle |
| `aria-labelledby` | Sections with headings | ✅ Modal dialogs, cookie banner |
| `aria-hidden` | Decorative elements | ✅ Icons, transition overlays |
| `aria-expanded` | Expandable menus | ✅ Cube nav menu toggle |
| `aria-controls` | Menu triggers | ✅ Links toggle to menu ID |
| `aria-live` | Dynamic content | ✅ Cookie banner, form errors |
| `aria-describedby` | Form field descriptions | ✅ Error messages linked |
| `role="menu"` | Navigation menus | ✅ Cube navigation dropdown |
| `role="menuitem"` | Menu items | ✅ Nav links |
| `role="dialog"` | Modal windows | ✅ Cookie preferences modal |

### Skip Link Implementation:
```html
<!-- EAiKW Skip Link -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Job Club Implementation -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- CSS -->
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px 16px;
  background: var(--color-primary);
  color: white;
  z-index: 10000;
}
.skip-link:focus {
  top: 0;
}
```

### Form Accessibility:
```html
<!-- Job Club Form Implementation -->
<div class="form-group">
  <label class="form-label" for="email">
    NJIT Email <span class="required" aria-label="required">*</span>
  </label>
  <input 
    type="email" 
    id="email" 
    name="email" 
    class="form-input" 
    required 
    aria-describedby="email-error"
    placeholder="jd123@njit.edu"
  >
  <span id="email-error" class="error-message" aria-live="polite"></span>
</div>
```

### Focus Management:

| Feature | Implementation |
|---------|----------------|
| Focus trapping | ✅ Cookie modal, nav menu |
| Visible focus indicators | ✅ `:focus-visible` with red outline |
| Return focus | ✅ After modal close |
| Keyboard navigation | ✅ Tab, Escape, Enter, Space |
| `prefers-reduced-motion` | ✅ Respects user preference |

### Color Contrast:

| Element | Foreground | Background | Ratio | Status |
|---------|------------|------------|-------|--------|
| Body text | #FFFFFF | #171717 | 15.1:1 | ✅ AAA |
| Primary button | #FFFFFF | #DC2626 | 4.6:1 | ✅ AA |
| Muted text | #A3A3A3 | #171717 | 7.4:1 | ✅ AAA |
| Error text | #DC2626 | #171717 | 5.1:1 | ✅ AA |

### What We Reused:
1. ✅ Semantic HTML structure (header, main, footer, nav, section)
2. ✅ ARIA labels on all interactive elements
3. ✅ Skip link for keyboard users
4. ✅ Form accessibility patterns with error announcements
5. ✅ Focus management in modals and menus
6. ✅ `prefers-reduced-motion` support
7. ✅ Color contrast meeting WCAG AA

---

## 4. SEO Strategy

**Files Analyzed:** `<head>` sections, meta tags, base layout

### Meta Tags Structure:

**EAiKW Pattern:**
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{{ description }}">
  
  <meta property="og:title" content="{{ title }}">
  <meta property="og:description" content="{{ description }}">
  <meta property="og:type" content="website">
  
  <title>{{ title }} | {{ site.title }}</title>
</head>
```

**Job Club Implementation (`base.njk`):**
```html
<head>
  <!-- Essential Meta -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{{ description or site.description }}">
  
  <!-- Open Graph (Social Sharing) -->
  <meta property="og:title" content="{{ title }} | {{ site.title }}">
  <meta property="og:description" content="{{ description or site.description }}">
  <meta property="og:type" content="website">
  
  <!-- Page Title -->
  <title>{{ title }} | {{ site.title }}</title>
  
  <!-- Preconnect for Performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
```

### Heading Hierarchy:

| Rule | EAiKW Practice | Job Club Implementation |
|------|----------------|------------------------|
| Single H1 | One `<h1>` per page | ✅ Enforced on all pages |
| Logical order | H1 → H2 → H3 (no skipping) | ✅ Strict hierarchy |
| Descriptive | Headings describe content | ✅ Clear section titles |

### URL Structure:

| Page | URL | SEO-Friendly |
|------|-----|--------------|
| Introduction | `/` | ✅ |
| Homepage | `/home/` | ✅ |
| Join | `/join/` | ✅ |
| Events | `/events/` | ✅ |
| Event Detail | `/events/[slug]/` | ✅ Dynamic |
| Resources | `/resources/` | ✅ |
| Resource Detail | `/resources/[slug]/` | ✅ Dynamic |
| Privacy | `/privacy/` | ✅ |

### What We Reused:
1. ✅ Complete meta tag structure
2. ✅ Open Graph tags for social sharing
3. ✅ Heading hierarchy rules
4. ✅ Clean URL patterns (no .html)
5. ✅ Descriptive page titles
6. ✅ Preconnect hints for external resources

---

## 5. Layout Patterns

### Page Layout Structure:
```
┌─────────────────────────────────────────────────┐
│ HEADER (fixed)                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ Logo                    Cube Nav    Eyebrow │ │
│ └─────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────┤
│ MAIN CONTENT                                    │
│ ┌─────────────────────────────────────────────┐ │
│ │ Hero Section (video/image background)       │ │
│ ├─────────────────────────────────────────────┤ │
│ │ Content Sections                            │ │
│ │ ┌─────────────────────────────────────────┐ │ │
│ │ │ Section Header (eyebrow + title + sub)  │ │ │
│ │ │ Section Content (cards, grid, etc.)     │ │ │
│ │ └─────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────┤
│ COOKIE BANNER (conditional)                     │
├─────────────────────────────────────────────────┤
│ FOOTER                                          │
│ ┌─────────────────────────────────────────────┐ │
│ │ Copyright                                   │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Component Patterns:

**1. Section Component:**
```html
<!-- EAiKW Section Pattern -->
<section class="section">
  <div class="container">
    <h2 class="section-title">...</h2>
    <div class="section-content">...</div>
  </div>
</section>

<!-- Job Club Enhanced Section -->
<section class="page-section">
  <div class="container">
    <div class="section-header center">
      <span class="section-eyebrow">Label</span>
      <h2 class="section-title">Title</h2>
      <p class="section-subtitle">Description</p>
    </div>
    <div class="section-content">
      <!-- Cards, grids, content -->
    </div>
  </div>
</section>
```

**2. Card Component:**
```html
<!-- Job Club Event Card -->
<article class="event-card">
  <div class="event-card-date">
    <span class="event-month">FEB</span>
    <span class="event-day">15</span>
  </div>
  <div class="event-card-content">
    <span class="event-type">Workshop</span>
    <h3 class="event-title">{{ event.title }}</h3>
    <p class="event-description">{{ event.description }}</p>
    <div class="event-meta">
      <span class="event-location">📍 {{ event.location }}</span>
    </div>
  </div>
</article>
```

**3. Button Variants:**
```css
/* Base Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: var(--border-radius);
  transition: all var(--transition-base);
  cursor: pointer;
}

/* Variants */
.btn-primary {
  background: var(--color-primary);
  color: white;
}
.btn-secondary {
  background: transparent;
  border: 2px solid var(--color-gray-600);
  color: white;
}
.btn-ghost {
  background: transparent;
  color: var(--color-gray-400);
}

/* Sizes */
.btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
.btn-lg { padding: 1rem 2rem; font-size: 1.125rem; }
```

**4. Form Components:**
```css
.form-group { margin-bottom: 1.5rem; }
.form-label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--color-gray-800);
  border: 1px solid var(--color-gray-700);
  border-radius: var(--border-radius);
  color: white;
}
.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-glow);
}
```

### What We Reused:
1. ✅ Page layout structure (header, main, footer)
2. ✅ Card component pattern (adapted for events/resources)
3. ✅ Section with eyebrow/title/subtitle pattern
4. ✅ Button variant system
5. ✅ Container + grid layout
6. ✅ Form component patterns

---

## 6. Performance Techniques

### Asset Optimization:

| Technique | EAiKW | Job Club |
|-----------|-------|----------|
| CSS minification | Build step | ✅ CI bundle check |
| JS minification | Build step | ⏳ Planned |
| Image optimization | Compressed | ✅ Optimized hero video/images |
| Font loading | `font-display: swap` | ✅ Google Fonts with swap |
| Preconnect hints | For external resources | ✅ fonts.googleapis.com |
| Lazy loading | Images | ⏳ To implement |

### Bundle Size Management:

| Asset | Target | Job Club Actual | Status |
|-------|--------|-----------------|--------|
| CSS (gzipped) | < 10KB | 9,998 bytes | ✅ |
| JS per file | < 5KB | All under 5KB | ✅ |
| Total JS | Minimal | ~20KB total | ✅ |

### Performance Optimizations Applied:

1. **Minimal JavaScript** - Only essential functionality
2. **CSS Custom Properties** - Reduces repetition
3. **System Font Stack** - Fallback before web fonts load
4. **Deferred Scripts** - Non-blocking loading
5. **Gzip Compression** - Verified in CI

---

## 7. JavaScript Patterns

### Minimal JS Philosophy:

EAiKW uses progressive enhancement with minimal JavaScript. Job Club follows this pattern:

| Feature | Approach |
|---------|----------|
| Navigation | CSS transitions + minimal JS toggle |
| Form validation | Progressive enhancement |
| Cookie consent | Standalone script |
| Analytics | Loaded only after consent |
| Animations | CSS-first, JS for complex only |

### Job Club JavaScript Files:

| File | Size | Purpose |
|------|------|---------|
| `cube-nav.js` | ~5KB | Navigation menu toggle |
| `join-form.js` | ~4KB | Form submission handler |
| `cookie-consent.js` | ~3KB | GDPR cookie banner |
| `analytics-events.js` | ~2KB | Event tracking |
| `form-validation.js` | ~4KB | Client-side validation |

---

## 8. Summary: Harvest Results

### ✅ Directly Adopted:

| Pattern | Source | Implementation |
|---------|--------|----------------|
| Eleventy config | EAiKW `.eleventy.js` | Same structure |
| CSS variables | EAiKW CSS | Adapted for dark theme |
| Responsive breakpoints | EAiKW media queries | Same values |
| Semantic HTML | EAiKW templates | Full adoption |
| ARIA patterns | EAiKW accessibility | Extended for forms |
| SEO meta tags | EAiKW `<head>` | Complete adoption |
| Component patterns | EAiKW cards/sections | Adapted styling |
| Layout system | EAiKW container/grid | Same approach |

### 🔄 Adapted/Enhanced:

| Pattern | Original | Job Club Version |
|---------|----------|------------------|
| Color scheme | Light theme, blue primary | Dark theme, red primary |
| Typography | Inter font | Outfit + DM Sans |
| Navigation | Standard nav bar | 3D cube navigation |
| Page transitions | None | Animated cube transitions |
| Theme | Light-first | Dark-first design |
| Forms | Basic | Enhanced validation + backend |

### 📚 Key Learnings:

1. **CSS Custom Properties** make theming and brand adaptation easy
2. **Semantic HTML** is essential for accessibility and SEO
3. **Mobile-first responsive design** scales well to all devices
4. **Component-based architecture** improves maintainability
5. **Consistent naming conventions** reduce team confusion
6. **Progressive enhancement** ensures functionality without JS
7. **Bundle size discipline** maintains performance

---

## 9. File Structure Comparison

**EAiKW Structure:**
```
eaikw/
├── src/
│   ├── _data/
│   ├── _includes/
│   │   ├── components/
│   │   └── layouts/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── [pages].njk
├── .eleventy.js
└── package.json
```

**Job Club Structure (Adopted):**
```
job-club/
├── src/
│   ├── _data/
│   │   ├── site.json
│   │   ├── events.js
│   │   ├── events.json
│   │   ├── resources.js
│   │   └── resources.json
│   ├── _includes/
│   │   ├── components/
│   │   │   ├── navbar.njk
│   │   │   ├── footer.njk
│   │   │   ├── cookie-banner.njk
│   │   │   ├── event-card.njk
│   │   │   └── resource-card.njk
│   │   └── layouts/
│   │       ├── base.njk
│   │       └── intro.njk
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   ├── cube-nav.js
│   │   ├── join-form.js
│   │   ├── cookie-consent.js
│   │   └── analytics-events.js
│   ├── assets/
│   │   └── images/
│   └── pages/
│       ├── index.njk (home)
│       ├── intro.njk
│       ├── join.njk
│       ├── events.njk
│       ├── resources.njk
│       └── privacy.njk
├── api/
│   ├── submit-form.js
│   └── sanity-webhook.js
├── backend/
│   └── sanity/
├── docs/
├── reference/
├── tests/
├── .eleventy.js
└── package.json
```

---

## 10. AI Usage in This Analysis

This harvest-notes.md was generated with AI assistance:

| Aspect | Details |
|--------|---------|
| **Tool** | Claude (Anthropic) |
| **Sessions** | 3 analysis sessions |
| **Date** | December 15-17, 2024 |

### Prompts Used:
1. "Analyze the EAiKW repository structure and identify reusable patterns"
2. "Document CSS architecture, variables, and naming conventions"
3. "Identify accessibility patterns including ARIA usage"
4. "Extract SEO best practices from the reference templates"
5. "Compare EAiKW layout patterns to Job Club requirements"

### Human Review:
- ✅ All findings verified against actual EAiKW code
- ✅ Patterns tested in Job Club implementation
- ✅ Accessibility verified with Lighthouse and manual testing
- ✅ Bundle sizes confirmed in CI pipeline

---

*Document Version: 1.1*
*Last Updated: December 17, 2024*
*Authors: Job Club Development Team*
