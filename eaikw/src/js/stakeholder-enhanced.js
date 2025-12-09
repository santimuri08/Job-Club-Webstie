/**
 * Swiss Design Stakeholder Cards Enhancement
 * Gold Standard: Intersection Observer + Micro-interactions
 * Similar to project cards but adapted for stakeholder pathways
 */

class SwissStakeholderEnhanced {
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
    this.cards = document.querySelectorAll("[data-stakeholder-card]");

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
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = parseInt(card.dataset.index) || 0;

          // Staggered animation delay based on index
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, index * 150); // 150ms stagger for better visual flow

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
    const number = card.querySelector(".stakeholder-number");
    const accentBar = card.querySelector(".stakeholder-accent-bar");
    const overlay = card.querySelector(".stakeholder-overlay");
    const border = card.querySelector(".absolute.inset-0");

    // Mouse enter - Swiss geometric reveal
    card.addEventListener("mouseenter", () => {
      // Geometric overlay slides in
      if (overlay) {
        overlay.style.opacity = "0.1";
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
        border.style.borderColor = "var(--swiss-black)";
      }

      // Subtle lift effect
      card.style.transform = "translateY(-4px)";
    });

    // Mouse leave - reset
    card.addEventListener("mouseleave", () => {
      if (overlay) {
        overlay.style.opacity = "0";
        overlay.style.transform = "translate(60px, -60px) rotate(45deg)";
      }

      if (number) {
        number.style.color = "var(--swiss-gray-200)";
        number.style.transform = "translateX(0)";
      }

      if (accentBar) {
        accentBar.style.width = "48px";
      }

      if (border) {
        border.style.borderColor = "transparent";
      }

      // Reset lift effect
      card.style.transform = "translateY(0)";
    });

    // Click animation - geometric pulse
    card.addEventListener("click", (e) => {
      // Don't animate if clicking a link or button
      if (e.target.tagName === "A" || e.target.closest("a") || e.target.tagName === "BUTTON") {
        return;
      }

      card.style.transform = "scale(0.98)";
      setTimeout(() => {
        card.style.transform = "scale(1)";
      }, 150);
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

// Initialize only on work-with-me page
if (document.querySelector("[data-stakeholder-card]")) {
  new SwissStakeholderEnhanced();
}

// Export for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = SwissStakeholderEnhanced;
}
