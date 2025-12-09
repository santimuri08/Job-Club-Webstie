// Alpine.js initialization for Headless UI-style components
import Alpine from "alpinejs";
import focus from "@alpinejs/focus";

// Register Focus plugin for better keyboard navigation
Alpine.plugin(focus);

// Mobile Menu Component - Swiss Gold Standard
Alpine.data("mobileMenu", () => ({
  open: false,

  init() {
    // Watch for open state changes
    this.$watch("open", (value) => {
      if (value) {
        this.lockScroll();
      } else {
        this.unlockScroll();
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.open) {
        this.close();
      }
    });

    // Close menu on route change (for SPAs or view transitions)
    window.addEventListener("popstate", () => {
      if (this.open) {
        this.close();
      }
    });
  },

  toggle() {
    this.open = !this.open;
  },

  close() {
    this.open = false;
  },

  // Lock body scroll when menu is open
  lockScroll() {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = this.getScrollbarWidth() + "px";
  },

  // Unlock body scroll when menu is closed
  unlockScroll() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  },

  // Get scrollbar width to prevent layout shift
  getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  },
}));

// Initialize Alpine
window.Alpine = Alpine;
Alpine.start();
