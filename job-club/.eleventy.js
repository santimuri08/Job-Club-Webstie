const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  
  // Passthrough copy for assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  
  // Date filter for Nunjucks
  eleventyConfig.addFilter("dateFormat", (dateObj, format = "LLLL d, yyyy") => {
    if (typeof dateObj === "string") {
      dateObj = new Date(dateObj);
    }
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  // Watch targets
  eleventyConfig.addWatchTarget("src/css/");
  eleventyConfig.addWatchTarget("src/js/");

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
