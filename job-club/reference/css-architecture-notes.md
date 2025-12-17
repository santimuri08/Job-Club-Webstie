# CSS Architecture Notes (EAiKW Harvest)

## What to look for in EAiKW

- Variable-driven theming (colors, spacing, typography)
- Component-first classes vs page-specific CSS
- Responsive layout patterns
- Consistent button/input styles

## Adaptation notes for Job Club

- Job Club uses a single `main.css` with:
  - CSS variables (`:root`)
  - Sectioned component blocks (header, nav, cards, forms)
- New features (cookie banner/modal) were styled to match:
  - dark surfaces
  - subtle borders
  - rounded corners
  - existing `.btn` components

## Actionable checklist

- Keep additions within existing component sections.
- Use existing variables and borders.
- Avoid introducing new font stacks or color constants.
