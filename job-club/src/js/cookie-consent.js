/**
 * Cookie Consent Banner
 * GDPR-compliant cookie consent handling
 */
(function() {
  'use strict';
  
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');
  const preferencesBtn = document.getElementById('cookie-preferences');
  const preferencesModal = document.getElementById('cookie-preferences-modal');
  const preferencesSaveBtn = document.getElementById('cookie-preferences-save');
  const preferencesCancelBtn = document.getElementById('cookie-preferences-cancel');
  const analyticsToggle = document.getElementById('cookie-analytics');
  
  if (!banner || !acceptBtn || !rejectBtn) {
    console.warn('Cookie banner elements not found');
    return;
  }
  
  // Check if user already made a choice
  const consent = localStorage.getItem('cookie-consent');
  
  if (consent === null) {
    // Show banner if no choice made
    banner.hidden = false;
  } else {
    const settings = parseConsent(consent);
    if (settings.analytics) {
      loadAnalytics();
    }
  }
  
  // Accept button handler
  acceptBtn.addEventListener('click', function() {
    localStorage.setItem('cookie-consent', JSON.stringify({ analytics: true }));
    banner.hidden = true;
    loadAnalytics();
  });
  
  // Reject button handler
  rejectBtn.addEventListener('click', function() {
    localStorage.setItem('cookie-consent', JSON.stringify({ analytics: false }));
    banner.hidden = true;
  });

  if (preferencesBtn && preferencesModal) {
    preferencesBtn.addEventListener('click', function() {
      const existing = parseConsent(localStorage.getItem('cookie-consent'));
      if (analyticsToggle) {
        analyticsToggle.checked = Boolean(existing.analytics);
      }
      preferencesModal.hidden = false;
    });
  }

  if (preferencesCancelBtn && preferencesModal) {
    preferencesCancelBtn.addEventListener('click', function() {
      preferencesModal.hidden = true;
    });
  }

  if (preferencesSaveBtn && preferencesModal) {
    preferencesSaveBtn.addEventListener('click', function() {
      const settings = {
        analytics: analyticsToggle ? Boolean(analyticsToggle.checked) : false
      };
      localStorage.setItem('cookie-consent', JSON.stringify(settings));
      preferencesModal.hidden = true;
      banner.hidden = true;
      if (settings.analytics) {
        loadAnalytics();
      }
    });
  }

  function parseConsent(value) {
    if (!value) return { analytics: false };
    if (value === 'accepted') return { analytics: true };
    if (value === 'rejected') return { analytics: false };
    try {
      const parsed = JSON.parse(value);
      return { analytics: Boolean(parsed && parsed.analytics) };
    } catch {
      return { analytics: false };
    }
  }
  
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
    
    const domain = document.documentElement.getAttribute('data-analytics-domain');
    if (domain && !document.getElementById('plausible-script')) {
      const script = document.createElement('script');
      script.id = 'plausible-script';
      script.defer = true;
      script.setAttribute('data-domain', domain);
      script.src = 'https://plausible.io/js/script.js';
      document.head.appendChild(script);
    }
  }
  
  // Track specific events (call these from other scripts)
  window.trackEvent = function(eventName, eventData) {
    const settings = parseConsent(localStorage.getItem('cookie-consent'));
    if (!settings.analytics) {
      return; // Don't track if not consented
    }
    
    // Plausible event tracking
    if (window.plausible) {
      window.plausible(eventName, { props: eventData || {} });
    }
  };
})();