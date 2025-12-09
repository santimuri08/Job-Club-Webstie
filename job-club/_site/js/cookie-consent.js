/**
 * Cookie Consent Banner
 * GDPR-compliant cookie consent handling
 */
(function() {
  'use strict';
  
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');
  
  if (!banner || !acceptBtn || !rejectBtn) {
    console.warn('Cookie banner elements not found');
    return;
  }
  
  // Check if user already made a choice
  const consent = localStorage.getItem('cookie-consent');
  
  if (consent === null) {
    // Show banner if no choice made
    banner.hidden = false;
  } else if (consent === 'accepted') {
    // Load analytics if previously accepted
    loadAnalytics();
  }
  
  // Accept button handler
  acceptBtn.addEventListener('click', function() {
    localStorage.setItem('cookie-consent', 'accepted');
    banner.hidden = true;
    loadAnalytics();
  });
  
  // Reject button handler
  rejectBtn.addEventListener('click', function() {
    localStorage.setItem('cookie-consent', 'rejected');
    banner.hidden = true;
  });
  
  /**
   * Load analytics script after consent
   * Replace with your actual analytics code
   */
  function loadAnalytics() {
    // Option 1: Plausible Analytics (recommended)
    // Uncomment and replace 'your-domain.com' with your actual domain
    /*
    const script = document.createElement('script');
    script.defer = true;
    script.setAttribute('data-domain', 'your-domain.com');
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
    */
    
    // Option 2: Google Analytics 4
    // Uncomment and replace 'G-XXXXXXXXXX' with your GA4 ID
    /*
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(gtagScript);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
    */
    
    console.log('Analytics loaded (consent given)');
  }
  
  // Track specific events (call these from other scripts)
  window.trackEvent = function(eventName, eventData) {
    if (localStorage.getItem('cookie-consent') !== 'accepted') {
      return; // Don't track if not consented
    }
    
    // Plausible event tracking
    // if (window.plausible) {
    //   plausible(eventName, { props: eventData });
    // }
    
    // GA4 event tracking
    // if (window.gtag) {
    //   gtag('event', eventName, eventData);
    // }
    
    console.log('Event tracked:', eventName, eventData);
  };
})();