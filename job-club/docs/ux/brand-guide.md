# Job Club Brand Guide

## Logo

**Primary Logo:** Text-based "Job Club" with icon
- Font: Bold, professional sans-serif
- Can be used with or without icon

**Usage:**
- Minimum size: 100px wide
- Clear space: Equal to height of "J"
- Don't stretch, rotate, or recolor

---

## Color Palette

### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | #1e40af | Buttons, links, accents |
| Primary Dark | #1e3a8a | Hover states, headers |

### Secondary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Success Green | #16a34a | Success messages, checkmarks |
| Warning Yellow | #ca8a04 | Warnings |
| Error Red | #dc2626 | Error messages, required |

### Neutral Colors

| Color | Hex | Usage |
|-------|-----|-------|
| White | #ffffff | Backgrounds, cards |
| Light Gray | #f1f5f9 | Section backgrounds |
| Medium Gray | #64748b | Secondary text |
| Dark Gray | #334155 | Body text |
| Dark | #1e293b | Headings, footer |

### CSS Variables
```css
:root {
  --color-primary: #1e40af;
  --color-primary-dark: #1e3a8a;
  --color-dark: #1e293b;
  --color-text: #334155;
  --color-text-light: #64748b;
  --color-white: #ffffff;
  --color-light: #f1f5f9;
  --color-success: #16a34a;
  --color-error: #dc2626;
}
```

---

## Typography

### Font Family
- **Primary:** Inter, -apple-system, BlinkMacSystemFont, sans-serif
- **Fallback:** System fonts for performance

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 2.5rem (40px) | 700 | 1.2 |
| H2 | 2rem (32px) | 700 | 1.2 |
| H3 | 1.5rem (24px) | 600 | 1.3 |
| Body | 1rem (16px) | 400 | 1.6 |
| Small | 0.875rem (14px) | 400 | 1.5 |

### CSS Variables
```css
:root {
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-size-base: 1rem;
  --font-size-sm: 0.875rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 2.5rem;
}
```

---

## Voice & Tone

### Voice Characteristics
- **Professional** but approachable
- **Encouraging** and supportive
- **Clear** and direct
- **Student-friendly** (avoid jargon)

### Do's
✅ "Get started today"
✅ "You'll receive a personalized checklist"
✅ "Join hundreds of students"
✅ "Build your AI career"

### Don'ts
❌ "Leverage synergies"
❌ "Utilize our platform"
❌ "Circle back on this"
❌ Overly casual ("yo", "gonna")

---

## Button Styles

### Primary Button
- Background: Primary Blue (#1e40af)
- Text: White
- Border-radius: 0.5rem
- Padding: 0.5rem 1.5rem
- Hover: Darker blue (#1e3a8a)

### Secondary Button
- Background: White
- Text: Primary Blue
- Border: 2px solid Primary Blue
- Hover: Light gray background

### Large Button
- Same as above with:
- Padding: 1rem 2rem
- Font-size: 1.125rem

---

## Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| xs | 0.25rem | Tight spacing |
| sm | 0.5rem | Small gaps |
| md | 1rem | Default spacing |
| lg | 1.5rem | Section padding |
| xl | 2rem | Large gaps |
| 2xl | 3rem | Section separation |
| 3xl | 4rem | Major sections |

---

## Component Samples

### Card
- Background: White
- Border: 1px solid #f1f5f9
- Border-radius: 0.5rem
- Padding: 1.5rem
- Shadow: None (clean look)

### Form Input
- Border: 1px solid #64748b
- Border-radius: 0.5rem
- Padding: 0.5rem 1rem
- Focus: Primary blue border

### Navigation
- Background: White
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Height: ~60px