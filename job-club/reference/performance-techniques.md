# Performance Techniques (EAiKW Harvest)

## What to look for in EAiKW

- Minimal JS execution on non-critical paths
- Static generation + CDN
- Asset caching
- Image optimization

## Job Club status

- Eleventy static output `_site/`.
- Minimal JS: nav + join form + cookie consent + optional analytics.

## Remaining TODO

- Defer non-critical scripts where possible.
- Add `preconnect`/`dns-prefetch` for analytics (optional).
- Add Lighthouse CI in GitHub Actions (added).
