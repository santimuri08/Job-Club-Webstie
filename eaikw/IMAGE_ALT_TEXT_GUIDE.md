# Image Alt Text Guidelines for SEO & Accessibility

**Purpose:** This guide ensures all images added to the portfolio site are optimized for search engines and accessible to screen reader users.

---

## Why Alt Text Matters

1. **SEO:** Google uses alt text to understand image content and context
2. **Accessibility:** Screen readers read alt text to visually impaired users
3. **Fallback:** Alt text displays if images fail to load
4. **Image Search:** Well-written alt text helps images rank in Google Image Search

---

## Best Practices

### ✅ Good Alt Text Examples

**Descriptive & Specific:**
```html
<!-- Good: Describes what the image shows -->
<img src="/images/chatgpt-growth-chart.png" alt="Chart showing ChatGPT reached 100 million users in 2 months compared to 300 years for the printing press">

<!-- Good: Includes context and data -->
<img src="/images/ai-adoption-graph.png" alt="Graph of AI adoption rates from 2022-2025 showing exponential growth">

<!-- Good: Describes person and context -->
<img src="/images/keith-townhall.jpg" alt="Keith Williams presenting at NJIT AI Town Hall to Newark community members">
```

**For Data Visualizations:**
```html
<!-- Good: Includes key data points -->
<img src="/images/productivity-comparison.png" alt="Bar chart: 30% productivity gains with AI for coding, 20% for writing, 10% for analysis">

<!-- Good: Describes trend -->
<img src="/images/job-market-trend.png" alt="Line graph showing steady increase in AI-related job postings from 2020 to 2025">
```

**For Screenshots:**
```html
<!-- Good: Describes UI and purpose -->
<img src="/images/eleventy-dashboard.png" alt="Eleventy build dashboard showing 35 pages generated in 0.33 seconds">

<!-- Good: Includes relevant text visible in image -->
<img src="/images/lighthouse-score.png" alt="Lighthouse audit results: 99% Performance, 100% SEO, 96% Accessibility">
```

**For Diagrams:**
```html
<!-- Good: Explains the concept -->
<img src="/images/topic-cluster-diagram.png" alt="Topic cluster architecture diagram with hub page linking to 5 related blog posts">

<!-- Good: Describes flow -->
<img src="/images/ai-workflow.png" alt="Workflow diagram showing 3 steps: user input, AI processing, human validation">
```

---

### ❌ Bad Alt Text Examples

**Too Generic:**
```html
<!-- Bad: Doesn't describe content -->
<img src="/images/chart.png" alt="chart">
<img src="/images/photo.jpg" alt="photo">
<img src="/images/image1.png" alt="image">
```

**Redundant Phrasing:**
```html
<!-- Bad: Screen readers already say "image" -->
<img src="/images/graph.png" alt="Image of a graph showing...">
<img src="/images/photo.jpg" alt="Picture of Keith Williams...">
```

**Keyword Stuffing:**
```html
<!-- Bad: Unnatural, spammy -->
<img src="/images/ai.png" alt="AI artificial intelligence machine learning AI ChatGPT AI technology AI tools">
```

**Too Long:**
```html
<!-- Bad: Over 125 characters, too verbose -->
<img src="/images/event.jpg" alt="This is a photograph taken at the NJIT EverydayAI community event on November 5th, 2025, where Keith Williams, who is the Director of Enterprise AI at NJIT, presented to Newark residents about how to use AI tools in their daily lives for health, education, legal help, and productivity purposes.">
```

**Empty or Missing:**
```html
<!-- Bad: No alt text at all -->
<img src="/images/important-chart.png">
<img src="/images/data.png" alt="">
```

---

## Alt Text Length Guidelines

- **Ideal:** 100-125 characters
- **Maximum:** 150 characters (screen readers may cut off)
- **Minimum:** Describe the essential information

**Example of Right-Sizing:**

```html
<!-- Too Short (not descriptive) -->
<img src="chart.png" alt="AI growth">

<!-- Just Right (descriptive but concise) -->
<img src="chart.png" alt="Chart showing AI user growth from 10M in 2022 to 100M in 2023">

<!-- Too Long (excessive detail) -->
<img src="chart.png" alt="A detailed bar chart visualization displaying the rapid growth trajectory of AI adoption metrics across multiple demographic segments from January 2022 through December 2023 with monthly data points">
```

---

## Special Cases

### Decorative Images

If an image is purely decorative and adds no information:
```html
<!-- Use empty alt attribute -->
<img src="/images/decorative-line.png" alt="">
```

**When to use empty alt:**
- Decorative borders or dividers
- Background patterns
- Spacer images
- Images that duplicate nearby text

### Logo Images

```html
<!-- Good: Include brand name -->
<img src="/images/everydayai-logo.svg" alt="EverydayAI logo">
<img src="/images/njit-logo.png" alt="New Jersey Institute of Technology logo">
```

### Social Media OG Images

Open Graph images don't use alt attributes but do use `og:image:alt`:
```html
<meta property="og:image:alt" content="Second Renaissance infographic: 100M users in 2 months vs 300 years for printing press">
```

---

## Context Matters

The same image may need different alt text depending on context:

**In a blog post about AI growth:**
```html
<img src="chatgpt-users.png" alt="Chart showing ChatGPT reached 100 million users in 2 months">
```

**In a post about user engagement:**
```html
<img src="chatgpt-users.png" alt="User engagement chart demonstrating viral adoption patterns">
```

**Key Principle:** Describe what's relevant to the surrounding content, not just what you see.

---

## Writing Process

1. **Ask:** What information does this image convey?
2. **Ask:** What would I tell someone who can't see it?
3. **Write:** Descriptive text focusing on key information
4. **Edit:** Remove redundant words ("image of", "picture of")
5. **Check:** Is it under 125 characters?
6. **Test:** Does it make sense read aloud?

---

## Implementation Checklist

Before publishing any page with images:

- [ ] Every `<img>` tag has an `alt` attribute
- [ ] Alt text is descriptive (not generic)
- [ ] Alt text is concise (≤125 characters)
- [ ] No "image of" or "picture of" phrasing
- [ ] No keyword stuffing
- [ ] Data/statistics included for charts
- [ ] Context matches surrounding content
- [ ] Decorative images use empty alt (`alt=""`)

---

## Testing Your Alt Text

**Screen Reader Test:**
1. Use Chrome's built-in screen reader or NVDA (free)
2. Navigate to your page
3. Listen to how images are announced
4. Ask: Does it make sense? Is it helpful?

**SEO Test:**
1. Use Google's Rich Results Test
2. Check if images are properly described
3. Verify alt text appears in structured data

**Manual Review:**
1. Hide images with CSS
2. Read the page with only alt text
3. Ask: Can I understand the content?

---

## Common Mistakes to Avoid

1. ❌ Using filename as alt text: `alt="IMG_20250106_143022.jpg"`
2. ❌ Leaving alt empty for important images: `alt=""`
3. ❌ Writing for SEO only, not users: `alt="AI machine learning artificial intelligence"`
4. ❌ Being too vague: `alt="screenshot"`
5. ❌ Repeating nearby text exactly
6. ❌ Including "image", "graphic", "photo" (redundant)

---

## Quick Reference Template

```html
<!-- For Charts/Graphs -->
<img src="..." alt="[Type] showing [main finding/trend]">

<!-- For Screenshots -->
<img src="..." alt="[What interface/tool] showing [key information]">

<!-- For Photos -->
<img src="..." alt="[Who/What] doing [action] at [location/context]">

<!-- For Diagrams -->
<img src="..." alt="[Type] illustrating [concept/process]">

<!-- For Logos -->
<img src="..." alt="[Brand name] logo">
```

---

## Resources

- [W3C Alt Text Guidelines](https://www.w3.org/WAI/tutorials/images/)
- [Google Image SEO Best Practices](https://developers.google.com/search/docs/appearance/google-images)
- [WebAIM Alt Text Guide](https://webaim.org/techniques/alttext/)

---

**Remember:** Good alt text serves both humans and search engines. When in doubt, prioritize clarity and usefulness for screen reader users.

**Last Updated:** November 6, 2025  
**Maintainer:** Keith Williams / EverydayAI Portfolio Team
