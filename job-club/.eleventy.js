module.exports = function(eleventyConfig) {
  // Add passthrough copy for assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("netlify/functions");

  // Add custom filters
  eleventyConfig.addFilter("formatDate", function(date) {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  eleventyConfig.addFilter("formatDateTime", function(date) {
    if (!date) return "";
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  });

  eleventyConfig.addFilter("slugify", function(str) {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  });

  eleventyConfig.addFilter("truncate", function(str, length = 150) {
    if (!str) return "";
    if (str.length <= length) return str;
    return str.substring(0, length) + "...";
  });

  // Add collection for events
  eleventyConfig.addCollection("upcomingEvents", function(collectionApi) {
    return collectionApi.getAll().filter(item => {
      return item.data.events && item.data.events.upcoming;
    });
  });

  // Add collection for featured resources
  eleventyConfig.addCollection("featuredResources", function(collectionApi) {
    return collectionApi.getAll().filter(item => {
      return item.data.resources && item.data.resources.featured;
    });
  });

  // Add watch targets for development
  eleventyConfig.addWatchTarget("./src/lib/");
  eleventyConfig.addWatchTarget("./netlify/functions/");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    quietMode: false,
    verbose: true
  };
};
