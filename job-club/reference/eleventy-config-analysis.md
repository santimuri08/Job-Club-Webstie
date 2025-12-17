# Eleventy Config Analysis (EAiKW Harvest)

## What to look for in EAiKW

- How `dir.input/includes/data/output` are configured
- Any passthrough copy patterns
- Filters/shortcodes that improve maintainability
- Pagination patterns for collections
- Data fetching strategy (build-time fetch vs cached fetch)

## Adaptation notes for Job Club

- Job Club uses Eleventy v2 and a `src/` input folder.
- We passthrough `src/css` and `src/js` and rely on Eleventy to emit `_site/`.
- We added build-time Sanity data via `src/_data/events.js` and `src/_data/resources.js` with fallback JSON.

## Actionable checklist

- Keep templates simple and readable.
- Prefer build-time data fetch for CMS-driven pages.
- Use pagination templates for detail pages (events/resources).
