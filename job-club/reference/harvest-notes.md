# EAiKW Harvest Notes

## Date Analyzed
[Insert date]

## AI Tools Used
- Claude (for code analysis)

---

## Eleventy Configuration

**File analyzed:** `eaikw/.eleventy.js`

### Key Findings:
- Input directory: `src/`
- Output directory: `_site/`
- Uses Nunjucks templating
- Passes through CSS and JS assets
- Uses custom filters for dates

### Configuration to reuse:
```javascript
// Copy their passthrough approach
eleventyConfig.addPassthroughCopy("src/css");
eleventyConfig.addPassthroughCopy("src/js");
```

---

## CSS Architecture

**Files analyzed:** `eaikw/src/css/`

### CSS Variables Found:
- Colors: [List the CSS custom properties you find]
- Typography: [Font sizes, families]
- Spacing: [Margin/padding values]

### Utility Classes:
- `.container` - Max-width wrapper
- `.grid` - CSS grid layout
- [Add more as you find them]

### Naming Convention:
- Uses BEM-like naming: `.component__element--modifier`

---

## Accessibility Findings

### ARIA Usage:
- `aria-label` on navigation: `<nav aria-label="Main navigation">`
- [Add more examples]

### Semantic HTML:
- Uses `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`
- Proper heading hierarchy (h1 → h2 → h3)

### Form Accessibility:
- All inputs have associated `<label>` elements
- Uses `for` attribute to link labels to inputs

---

## SEO Strategy

### Meta Tags Found:
- `<meta charset="UTF-8">`
- `<meta name="viewport" content="...">`
- `<meta name="description" content="...">`

### Open Graph Tags:
- `og:title`
- `og:description`
- `og:type`

### Heading Structure:
- One `<h1>` per page
- Logical h2, h3 hierarchy

---

## Layout Patterns

### Grid System:
- Uses CSS Grid for layouts
- Responsive breakpoints at 768px and 1024px

### Container Width:
- Max-width: 1200px
- Padding: 1rem on sides

---

## Patterns to Reuse in Job Club

1. **CSS Variables approach** - Define all colors, spacing, fonts as variables
2. **Semantic HTML structure** - header > nav, main > section/article, footer
3. **Accessibility patterns** - ARIA labels, proper form labels
4. **SEO meta tags** - Full set of OG tags
5. **Responsive grid** - Mobile-first with breakpoints
