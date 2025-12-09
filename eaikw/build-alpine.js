import esbuild from "esbuild";

/**
 * Shared esbuild configuration
 * @param {string} entryPoint - Input file path
 * @param {string} outfile - Output file path
 */
function buildJS(entryPoint, outfile) {
  return esbuild.build({
    entryPoints: [entryPoint],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ["es2020"],
    format: "iife",
    platform: "browser",
    outfile,
  });
}

// Bundle all JavaScript files
await Promise.all([
  buildJS("src/js/mobile-menu.js", "_site/js/mobile-menu.bundle.js"),
  buildJS("src/js/smooth-scroll.js", "_site/js/smooth-scroll.bundle.js"),
  buildJS("src/js/projects-enhanced.js", "_site/js/projects-enhanced.bundle.js"),
  buildJS("src/js/about-enhanced.js", "_site/js/about-enhanced.bundle.js"),
  buildJS("src/js/stakeholder-enhanced.js", "_site/js/stakeholder-enhanced.bundle.js"),
  buildJS("src/js/path-cards-enhanced.js", "_site/js/path-cards-enhanced.bundle.js"),
  buildJS("src/js/chapters-nav.js", "_site/js/chapters-nav.bundle.js"),
]);

console.log("✓ JavaScript bundles built successfully");
