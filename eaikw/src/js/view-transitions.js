/**
 * View Transitions API Integration
 * Provides smooth page transitions when navigating between pages
 * Falls back gracefully for browsers that don't support the API
 */

/**
 * Check if View Transitions API is supported
 */
function supportsViewTransitions() {
  return typeof document !== "undefined" && "startViewTransition" in document;
}

/**
 * Navigate with view transition
 * @param {string} url - The URL to navigate to
 */
function navigateWithTransition(url) {
  if (!supportsViewTransitions()) {
    // Fallback: normal navigation
    window.location.href = url;
    return;
  }

  // Use View Transitions API
  document.startViewTransition(async () => {
    // Fetch the new page
    const response = await fetch(url);
    const html = await response.text();

    // Parse the response
    const parser = new DOMParser();
    const newDoc = parser.parseFromString(html, "text/html");

    // Update the document title
    document.title = newDoc.title;

    // Update the main content
    const mainContent = document.querySelector("main");
    const newMainContent = newDoc.querySelector("main");

    if (mainContent && newMainContent) {
      mainContent.innerHTML = newMainContent.innerHTML;
    }

    // Update the URL without reloading
    window.history.pushState({}, "", url);

    // Scroll to top
    window.scrollTo(0, 0);
  });
}

/**
 * Initialize View Transitions for internal links
 */
function initViewTransitions() {
  if (!supportsViewTransitions()) {
    // View Transitions API not supported - using standard navigation
    return;
  }

  // View Transitions API enabled

  // Intercept clicks on internal links
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    // Check if it's an internal link
    if (
      link &&
      link.href &&
      link.href.startsWith(window.location.origin) &&
      !link.target &&
      !link.download &&
      !link.hasAttribute("data-no-transition")
    ) {
      event.preventDefault();
      navigateWithTransition(link.href);
    }
  });

  // Handle browser back/forward buttons
  window.addEventListener("popstate", (_event) => {
    if (supportsViewTransitions()) {
      document.startViewTransition(() => {
        // Browser handles the navigation
      });
    }
  });
}

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initViewTransitions);
} else {
  initViewTransitions();
}

// Export for use in other modules
export { supportsViewTransitions, navigateWithTransition, initViewTransitions };
