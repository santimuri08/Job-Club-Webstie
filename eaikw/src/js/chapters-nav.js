/**
 * Chapter Navigation System for Swiss Design
 * Handles scroll-spy, progress tracking, chapter navigation, and keyboard controls
 */

class ChaptersNavigation {
  constructor() {
    this.chapters = [];
    this.currentChapter = 0;
    this.chapterGroups = [
      { title: "Introduction", start: 0, end: 2 },
      { title: "The Build Process", start: 3, end: 8 },
      { title: "Technical Deep Dive", start: 9, end: 12 },
      { title: "Lessons & Conclusion", start: 13, end: 15 },
    ];
    this.init();
  }

  init() {
    this.findChapters();
    this.buildNavigation();
    this.setupScrollSpy();
    this.setupNavButtons();
    this.setupKeyboardNav();
    this.setupMobileToggle();
  }

  /**
   * Find all H2 headings with IDs (chapters)
   */
  findChapters() {
    const contentArea = document.querySelector(".chapters-content .prose-swiss");
    if (!contentArea) {
      return;
    }

    const headings = contentArea.querySelectorAll("h2[id]");
    this.chapters = Array.from(headings).map((heading, index) => ({
      id: heading.id,
      title: heading.textContent.trim(),
      element: heading,
      number: index + 1,
    }));
  }

  /**
   * Build the navigation list with groups and reading times
   */
  buildNavigation() {
    const navList = document.getElementById("chapters-list");
    if (!navList || this.chapters.length === 0) {
      return;
    }

    let html = "";
    let currentGroupIndex = 0;

    this.chapters.forEach((chapter, index) => {
      // Check if we need to add a group title
      const group = this.chapterGroups.find((g) => index >= g.start && index <= g.end);
      if (group && index === group.start && (currentGroupIndex === 0 || index !== 0)) {
        html += `<li class="chapters-section-title">${group.title}</li>`;
        currentGroupIndex++;
      }

      // Calculate reading time (rough estimate: 200 words per minute)
      const readingTime = this.estimateReadingTime(chapter.element);

      html += `
      <li>
        <a href="#${chapter.id}" data-chapter="${chapter.number}">
          <span class="chapter-number">${chapter.number}</span>
          <span class="chapter-title">${chapter.title}</span>
          <span class="chapter-time">${readingTime}</span>
        </a>
      </li>
    `;
    });

    navList.innerHTML = html;

    // Smooth scroll on click
    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          history.pushState(null, null, `#${targetId}`);
        }
      });
    });
  }

  /**
   * Estimate reading time for a chapter section
   */
  estimateReadingTime(element) {
    // Find the next h2 or end of content
    let content = "";
    let currentElement = element.nextElementSibling;

    while (currentElement && currentElement.tagName !== "H2") {
      content += currentElement.textContent || "";
      currentElement = currentElement.nextElementSibling;
    }

    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);

    return `${minutes}m`;
  }

  /**
   * Setup scroll spy to track current chapter
   */
  setupScrollSpy() {
    if (this.chapters.length === 0) {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const chapterIndex = this.chapters.findIndex((ch) => ch.element === entry.target);
          if (chapterIndex !== -1) {
            this.setActiveChapter(chapterIndex);
          }
        }
      });
    }, observerOptions);

    this.chapters.forEach((chapter) => {
      observer.observe(chapter.element);
    });

    // Also track scroll progress
    window.addEventListener("scroll", () => this.updateProgress(), {
      passive: true,
    });

    // Initial state
    this.updateProgress();
  }

  /**
   * Set the active chapter in navigation
   */
  setActiveChapter(index) {
    this.currentChapter = index;

    // Update navigation active state
    const navLinks = document.querySelectorAll("#chapters-list a");
    navLinks.forEach((link, i) => {
      if (i === index) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Update prev/next buttons
    this.updateNavButtons();
  }

  /**
   * Update scroll progress indicator and visual bar
   */
  updateProgress() {
    const progressEl = document.getElementById("chapters-progress");
    const progressFill = document.getElementById("chapters-progress-fill");
    if (!progressEl) {
      return;
    }

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollPercent = Math.min(
      100,
      Math.round((scrollTop / (documentHeight - windowHeight)) * 100)
    );

    progressEl.textContent = `${scrollPercent}%`;

    if (progressFill) {
      progressFill.style.width = `${scrollPercent}%`;
    }
  }

  /**
   * Setup previous/next chapter buttons
   */
  setupNavButtons() {
    const prevBtn = document.getElementById("prev-chapter");
    const nextBtn = document.getElementById("next-chapter");

    if (!prevBtn || !nextBtn) {
      return;
    }

    prevBtn.addEventListener("click", () => {
      if (this.currentChapter > 0) {
        const prevChapter = this.chapters[this.currentChapter - 1];
        prevChapter.element.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, null, `#${prevChapter.id}`);
      }
    });

    nextBtn.addEventListener("click", () => {
      if (this.currentChapter < this.chapters.length - 1) {
        const nextChapter = this.chapters[this.currentChapter + 1];
        nextChapter.element.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, null, `#${nextChapter.id}`);
      }
    });

    this.updateNavButtons();
  }

  /**
   * Update prev/next button states
   */
  updateNavButtons() {
    const prevBtn = document.getElementById("prev-chapter");
    const nextBtn = document.getElementById("next-chapter");

    if (!prevBtn || !nextBtn) {
      return;
    }

    prevBtn.disabled = this.currentChapter === 0;
    nextBtn.disabled = this.currentChapter === this.chapters.length - 1;
  }

  /**
   * Setup keyboard navigation (arrow keys)
   */
  setupKeyboardNav() {
    document.addEventListener("keydown", (e) => {
      // Only handle if not in an input field
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        return;
      }

      // ArrowUp or 'k' - previous chapter
      if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        if (this.currentChapter > 0) {
          const prevChapter = this.chapters[this.currentChapter - 1];
          prevChapter.element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          history.pushState(null, null, `#${prevChapter.id}`);
        }
      }

      // ArrowDown or 'j' - next chapter
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        if (this.currentChapter < this.chapters.length - 1) {
          const nextChapter = this.chapters[this.currentChapter + 1];
          nextChapter.element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          history.pushState(null, null, `#${nextChapter.id}`);
        }
      }
    });
  }

  /**
   * Setup mobile toggle for chapter navigation
   */
  setupMobileToggle() {
    // Create toggle button for mobile
    const nav = document.getElementById("chapters-nav");
    if (!nav) {
      return;
    }

    // Only create toggle on mobile
    if (window.innerWidth <= 768) {
      this.createMobileToggle(nav);
    }

    // Handle resize
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 768) {
        if (!document.querySelector(".chapters-toggle")) {
          this.createMobileToggle(nav);
        }
      } else {
        const toggle = document.querySelector(".chapters-toggle");
        if (toggle) {
          toggle.remove();
        }
        nav.classList.remove("open");
      }
    });
  }

  /**
   * Create mobile toggle button
   */
  createMobileToggle(nav) {
    const existingToggle = document.querySelector(".chapters-toggle");
    if (existingToggle) {
      return;
    }

    const toggle = document.createElement("button");
    toggle.className = "chapters-toggle";
    toggle.textContent = "Chapters";
    toggle.setAttribute("aria-label", "Toggle chapter navigation");

    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.textContent = nav.classList.contains("open") ? "Close" : "Chapters";
    });

    document.body.appendChild(toggle);

    // Close on chapter click
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.textContent = "Chapters";
      });
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ChaptersNavigation();
  });
} else {
  new ChaptersNavigation();
}
