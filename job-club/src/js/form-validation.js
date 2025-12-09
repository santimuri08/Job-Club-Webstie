/**
 * Onboarding Form Validation
 * Client-side validation and submission handling
 */
(function() {
  'use strict';
  
  const form = document.getElementById('onboarding-form');
  const successMessage = document.getElementById('success-message');
  
  if (!form) return;
  
  // Form submission handler
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Validate form
    const isValid = validateForm();
    
    if (isValid) {
      submitForm();
    }
  });
  
  // Real-time validation on blur
  const inputs = form.querySelectorAll('input, select');
  inputs.forEach(function(input) {
    input.addEventListener('blur', function() {
      validateField(input);
    });
    
    // Clear error on input
    input.addEventListener('input', function() {
      clearFieldError(input.id);
    });
  });
  
  /**
   * Validate all form fields
   * @returns {boolean} True if all fields valid
   */
  function validateForm() {
    let isValid = true;
    
    // Required fields
    const requiredFields = [
      { id: 'name', message: 'Please enter your full name' },
      { id: 'email', message: 'Please enter your email address' },
      { id: 'major', message: 'Please enter your major' },
      { id: 'graduation-year', message: 'Please select your graduation year' },
      { id: 'career-goal', message: 'Please select your career goal' }
    ];
    
    requiredFields.forEach(function(field) {
      const input = document.getElementById(field.id);
      if (!input.value.trim()) {
        showError(field.id, field.message);
        isValid = false;
      }
    });
    
    // Email validation
    const email = document.getElementById('email');
    if (email.value && !isValidEmail(email.value)) {
      showError('email', 'Please enter a valid email address');
      isValid = false;
    }
    
    // URL validation for optional fields
    const urlFields = [
      { id: 'linkedin', domain: 'linkedin.com' },
      { id: 'github', domain: 'github.com' },
      { id: 'portfolio', domain: null },
      { id: 'calendly', domain: 'calendly.com' }
    ];
    
    urlFields.forEach(function(field) {
      const input = document.getElementById(field.id);
      if (input.value) {
        if (!isValidUrl(input.value)) {
          showError(field.id, 'Please enter a valid URL (include https://)');
          isValid = false;
        } else if (field.domain && !input.value.includes(field.domain)) {
          showError(field.id, `Please enter a valid ${field.domain} URL`);
          isValid = false;
        }
      }
    });
    
    return isValid;
  }
  
  /**
   * Validate a single field
   * @param {HTMLElement} input - Input element to validate
   */
  function validateField(input) {
    clearFieldError(input.id);
    
    if (input.required && !input.value.trim()) {
      showError(input.id, 'This field is required');
      return;
    }
    
    if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
      showError(input.id, 'Please enter a valid email address');
      return;
    }
    
    if (input.type === 'url' && input.value && !isValidUrl(input.value)) {
      showError(input.id, 'Please enter a valid URL');
      return;
    }
  }
  
  /**
   * Clear all error messages
   */
  function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(function(el) {
      el.textContent = '';
    });
  }
  
  /**
   * Clear error for a specific field
   * @param {string} fieldId - ID of the field
   */
  function clearFieldError(fieldId) {
    const errorEl = document.getElementById(fieldId + '-error');
    if (errorEl) {
      errorEl.textContent = '';
    }
  }
  
  /**
   * Show error message for a field
   * @param {string} fieldId - ID of the field
   * @param {string} message - Error message
   */
  function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + '-error');
    if (errorEl) {
      errorEl.textContent = message;
    }
    
    // Focus the first error field
    const firstError = document.querySelector('.error-message:not(:empty)');
    if (firstError) {
      const fieldId = firstError.id.replace('-error', '');
      const field = document.getElementById(fieldId);
      if (field) field.focus();
    }
  }
  
  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean}
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  /**
   * Validate URL format
   * @param {string} url - URL to validate
   * @returns {boolean}
   */
  function isValidUrl(url) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }
  
  /**
   * Submit form to backend
   */
  function submitForm() {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Add timestamp
    data.submittedAt = new Date().toISOString();
    
    // Identify missing fields for checklist
    data.missingLinkedin = !data.linkedinUrl;
    data.missingGithub = !data.githubUrl;
    data.missingPortfolio = !data.portfolioUrl;
    data.missingCalendly = !data.calendlyLink;
    
    // TODO: Replace with actual webhook URL from backend partner
    const webhookUrl = 'YOUR_WEBHOOK_URL_HERE';
    
    // For development: show success immediately
    // Remove this block and uncomment the fetch below when backend is ready
    console.log('Form data:', data);
    form.hidden = true;
    successMessage.hidden = false;
    
    // Track form submission
    if (window.trackEvent) {
      window.trackEvent('form_submission', { careerGoal: data.careerGoal });
    }
    
    /*
    // Production: Submit to webhook
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function(response) {
      if (response.ok) {
        form.hidden = true;
        successMessage.hidden = false;
        
        // Track successful submission
        if (window.trackEvent) {
          window.trackEvent('form_submission', { careerGoal: data.careerGoal });
        }
      } else {
        throw new Error('Submission failed');
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again or contact us on Discord.');
    });
    */
  }
})();