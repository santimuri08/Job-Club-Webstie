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

  // Page info for transitions - using SVG icons
  const pageInfo = {
    home: { 
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>', 
      title: 'HOME' 
    },
    events: { 
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>', 
      title: 'EVENTS' 
    },
    resources: { 
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>', 
      title: 'RESOURCES' 
    },
    join: { 
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>', 
      title: 'JOIN' 
    },
    privacy: { 
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>', 
      title: 'PRIVACY' 
    }
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
      // Use innerHTML for SVG icons
      transitionIcon.innerHTML = pageInfo[page].icon;
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
