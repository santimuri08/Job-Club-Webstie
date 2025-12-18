/**
 * Onboarding Form Validation
 * Client-side validation and submission handling
 * Updated to match join.njk form field IDs
 */
(function() {
  'use strict';
  
  // Match the actual form ID in join.njk
  const form = document.getElementById('join-form');
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
  const inputs = form.querySelectorAll('input, select, textarea');
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
    
    // Required fields - matching actual IDs in join.njk
    const requiredFields = [
      { id: 'firstName', message: 'Please enter your first name' },
      { id: 'lastName', message: 'Please enter your last name' },
      { id: 'email', message: 'Please enter your NJIT email address' },
      { id: 'major', message: 'Please enter your major' },
      { id: 'graduationYear', message: 'Please select your graduation year' },
      { id: 'careerPath', message: 'Please select your career path' }
    ];
    
    requiredFields.forEach(function(field) {
      const input = document.getElementById(field.id);
      if (input && !input.value.trim()) {
        showError(field.id, field.message);
        isValid = false;
      }
    });
    
    // Email validation - must be NJIT email
    const email = document.getElementById('email');
    if (email && email.value) {
      if (!isValidEmail(email.value)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
      } else if (!email.value.includes('@njit.edu')) {
        showError('email', 'Please use your NJIT email address (@njit.edu)');
        isValid = false;
      }
    }
    
    // URL validation for optional fields
    const urlFields = [
      { id: 'linkedin', domain: 'linkedin.com', label: 'LinkedIn' },
      { id: 'github', domain: 'github.com', label: 'GitHub' },
      { id: 'portfolio', domain: null, label: 'Portfolio' },
      { id: 'calendly', domain: 'calendly.com', label: 'Calendly' }
    ];
    
    urlFields.forEach(function(field) {
      const input = document.getElementById(field.id);
      if (input && input.value.trim()) {
        if (!isValidUrl(input.value)) {
          showError(field.id, 'Please enter a valid URL (include https://)');
          isValid = false;
        } else if (field.domain && !input.value.toLowerCase().includes(field.domain)) {
          showError(field.id, `Please enter a valid ${field.label} URL`);
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
    if (!input || !input.id) return;
    
    clearFieldError(input.id);
    
    // Required field check
    if (input.required && !input.value.trim()) {
      showError(input.id, 'This field is required');
      return;
    }
    
    // Email validation
    if (input.type === 'email' && input.value) {
      if (!isValidEmail(input.value)) {
        showError(input.id, 'Please enter a valid email address');
        return;
      }
      if (!input.value.includes('@njit.edu')) {
        showError(input.id, 'Please use your NJIT email address');
        return;
      }
    }
    
    // URL validation for specific fields
    const urlFieldIds = ['linkedin', 'github', 'portfolio', 'calendly'];
    if (urlFieldIds.includes(input.id) && input.value.trim()) {
      if (!isValidUrl(input.value)) {
        showError(input.id, 'Please enter a valid URL (include https://)');
        return;
      }
    }
  }
  
  /**
   * Clear all error messages
   */
  function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(function(el) {
      el.textContent = '';
      el.classList.remove('visible');
    });
    
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    inputs.forEach(function(el) {
      el.classList.remove('error');
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
      errorEl.classList.remove('visible');
    }
    
    const input = document.getElementById(fieldId);
    if (input) {
      input.classList.remove('error');
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
      errorEl.classList.add('visible');
    }
    
    const input = document.getElementById(fieldId);
    if (input) {
      input.classList.add('error');
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
    
    // Combine first and last name
    data.fullName = `${data.firstName} ${data.lastName}`.trim();
    
    // Identify missing optional fields for checklist
    data.missingLinkedin = !data.linkedin;
    data.missingGithub = !data.github;
    data.missingPortfolio = !data.portfolio;
    data.missingCalendly = !data.calendly;
    
    // TODO: Replace with actual webhook URL from backend partner
    const webhookUrl = 'YOUR_WEBHOOK_URL_HERE';
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // For development: show success immediately
    // Remove this block and uncomment the fetch below when backend is ready
    console.log('Form data:', data);
    
    setTimeout(function() {
      form.style.display = 'none';
      if (successMessage) {
        successMessage.hidden = false;
        successMessage.style.display = 'block';
      }
      
      // Track form submission
      if (window.trackEvent) {
        window.trackEvent('form_submission', { careerPath: data.careerPath });
      }
    }, 500);
    
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
        form.style.display = 'none';
        if (successMessage) {
          successMessage.hidden = false;
          successMessage.style.display = 'block';
        }
        
        // Track successful submission
        if (window.trackEvent) {
          window.trackEvent('form_submission', { careerPath: data.careerPath });
        }
      } else {
        throw new Error('Submission failed');
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      alert('Something went wrong. Please try again or contact us on Discord.');
    });
    */
  }
  // Track onboarding form view
if (document.querySelector('.join-form')) {
  if (window.trackOnboardingFormView) {
    window.trackOnboardingFormView();
  }
}
})();
