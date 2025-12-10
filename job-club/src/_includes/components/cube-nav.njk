/**
 * Cube Navigation - Mini cube menu toggle
 */
(function() {
  'use strict';

  const cubeNav = document.querySelector('.cube-nav-mini');
  const cubeToggle = document.querySelector('.cube-nav-toggle');
  const navMenu = document.querySelector('.cube-nav-menu');
  const menuItems = document.querySelectorAll('.nav-menu-item');
  const pageTransition = document.getElementById('page-transition');
  const transitionIcon = document.getElementById('transition-icon');
  const transitionTitle = document.getElementById('transition-title');

  if (!cubeToggle || !navMenu) return;

  // Page info for transitions
  const pageInfo = {
    home: { icon: '🏠', title: 'HOME' },
    events: { icon: '📅', title: 'EVENTS' },
    resources: { icon: '📚', title: 'RESOURCES' },
    join: { icon: '🚀', title: 'JOIN' },
    privacy: { icon: '🔒', title: 'PRIVACY' },
    intro: { icon: '✦', title: 'INTRODUCTION' }
  };

  // Toggle menu
  function toggleMenu() {
    const isOpen = cubeNav.classList.toggle('open');
    cubeToggle.setAttribute('aria-expanded', isOpen);
  }

  // Close menu
  function closeMenu() {
    cubeNav.classList.remove('open');
    cubeToggle.setAttribute('aria-expanded', 'false');
  }

  // Handle navigation with transition
  function navigateTo(url, page) {
    if (pageTransition && transitionIcon && transitionTitle && pageInfo[page]) {
      transitionIcon.textContent = pageInfo[page].icon;
      transitionTitle.textContent = pageInfo[page].title;
      pageTransition.classList.add('active');
      
      setTimeout(() => {
        window.location.href = url;
      }, 400);
    } else {
      window.location.href = url;
    }
  }

  // Event listeners
  cubeToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Menu item clicks
  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      const page = this.getAttribute('data-page');
      const href = this.getAttribute('href');
      
      // Skip external links
      if (href.startsWith('http') || !page) return;
      
      e.preventDefault();
      closeMenu();
      navigateTo(href, page);
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!cubeNav.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // Keyboard navigation in menu
  cubeToggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

})();