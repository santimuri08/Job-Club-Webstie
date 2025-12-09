/**
 * Swiss Design Path Cards Enhancement
 * Gold Standard: Intersection Observer + Micro-interactions
 * For homepage "Choose Your Path" section
 */

class SwissPathCardsEnhanced {
  constructor() {
    this.cards = null;
    this.observer = null;
    this.init();
  }

  init() {
    // Wait for DOM
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.cards = document.querySelectorAll("[data-path-card]");

    if (!this.cards.length) {
      return;
    }

    // Setup Intersection Observer for scroll-triggered animations
    this.setupScrollAnimations();

    // Setup hover interactions for each card
    this.cards.forEach((card) => this.setupCardInteractions(card));
  }

  /**
   * Intersection Observer for staggered fade-in animations
   */
  setupScrollAnimations() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = parseInt(card.dataset.index) || 0;

          // Staggered animation delay based on index
          // 2x2 grid: cards 1 & 2 animate together, then 3 & 4
          const row = Math.floor((index - 1) / 2);
          const delay = row * 200 + ((index - 1) % 2) * 100;

          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, delay);

          // Stop observing once animated
          this.observer.unobserve(card);
        }
      });
    }, options);

    this.cards.forEach((card) => this.observer.observe(card));
  }

  /**
   * Advanced hover interactions for each card
   */
  setupCardInteractions(card) {
    const number = card.querySelector(".path-number");
    const accentBar = card.querySelector(".path-accent-bar");
    const overlay = card.querySelector(".path-overlay");
    const border = card.querySelector(".absolute.inset-0");
    const links = card.querySelectorAll(".path-link");

    // Mouse enter - Swiss geometric reveal
    card.addEventListener("mouseenter", () => {
      // Geometric overlay slides in
      if (overlay) {
        overlay.style.opacity = "0.08";
        overlay.style.transform = "translate(0, 0) rotate(45deg)";
      }

      // Number color shift to red
      if (number) {
        number.style.color = "var(--swiss-red)";
        number.style.transform = "translateX(-4px)";
      }

      // Accent bar extends
      if (accentBar) {
        accentBar.style.width = "80px";
      }

      // Border effect
      if (border) {
        border.style.borderColor = "var(--swiss-gray-600)";
      }

      // Links brighten
      links.forEach((link) => {
        link.style.color = "var(--swiss-white)";
      });

      // Subtle lift effect
      card.style.transform = "translateY(-4px)";
      card.style.borderColor = "var(--swiss-red)";
    });

    // Mouse leave - reset
    card.addEventListener("mouseleave", () => {
      if (overlay) {
        overlay.style.opacity = "0";
        overlay.style.transform = "translate(60px, -60px) rotate(45deg)";
      }

      if (number) {
        number.style.color = "var(--swiss-gray-800)";
        number.style.transform = "translateX(0)";
      }

      if (accentBar) {
        accentBar.style.width = "48px";
      }

      if (border) {
        border.style.borderColor = "transparent";
      }

      links.forEach((link) => {
        link.style.color = "var(--swiss-gray-300)";
      });

      // Reset lift effect
      card.style.transform = "translateY(0)";
      card.style.borderColor = "var(--swiss-gray-700)";
    });

    // Click animation - geometric pulse
    card.addEventListener("click", (e) => {
      // Don't animate if clicking a link
      if (e.target.tagName === "A" || e.target.closest("a")) {
        return;
      }

      card.style.transform = "scale(0.98)";
      setTimeout(() => {
        card.style.transform = "scale(1)";
      }, 150);
    });

    // Individual link hover effects
    links.forEach((link) => {
      link.addEventListener("mouseenter", (e) => {
        e.stopPropagation();
        link.style.color = "var(--swiss-red)";
        link.style.paddingLeft = "8px";
      });

      link.addEventListener("mouseleave", (e) => {
        e.stopPropagation();
        link.style.paddingLeft = "0";
      });
    });
  }

  /**
   * Clean up observers
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Initialize only on homepage
if (document.querySelector("[data-path-card]")) {
  new SwissPathCardsEnhanced();
}

// Export for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = SwissPathCardsEnhanced;
}
