/**
 * Resource Modal Handler
 * Displays internal resource guides in a modal overlay
 * Compatible with Sanity CMS data structure
 */
(function() {
  'use strict';

  // Get resources data from the page
  const resourcesDataEl = document.getElementById('resources-data');
  if (!resourcesDataEl) return;
  
  let resources;
  try {
    resources = JSON.parse(resourcesDataEl.textContent);
  } catch (e) {
    console.error('Failed to parse resources data:', e);
    return;
  }
  
  // Modal elements
  const modal = document.getElementById('resource-modal');
  if (!modal) return;
  
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalBody = document.getElementById('modal-body');
  const modalAction = document.getElementById('modal-action');
  const modalCloseBtn = modal.querySelector('.modal-close');
  const modalCloseBtnSecondary = modal.querySelector('.modal-close-btn');
  const modalBackdrop = modal.querySelector('.modal-backdrop');

  // Get all internal resource cards
  const cards = document.querySelectorAll('.resource-card[data-type="internal"]');
  
  // Find resource by slug (compatible with Sanity data)
  function getResourceBySlug(slug) {
    return resources.find(r => r.slug === slug);
  }
  
  // Generate modal content HTML
  // Handles both frontend JSON format and Sanity portable text format
  function generateContentHTML(resource) {
    if (!resource.content) {
      return '<p>Content coming soon...</p>';
    }
    
    // Handle array of content sections (frontend format)
    if (Array.isArray(resource.content)) {
      // Check if it's Sanity portable text format
      if (resource.content[0] && resource.content[0]._type === 'block') {
        // Sanity portable text - render paragraphs
        return resource.content.map(block => {
          if (block._type === 'block' && block.children) {
            const text = block.children.map(child => child.text || '').join('');
            return `<p class="modal-section-text">${text}</p>`;
          }
          return '';
        }).join('');
      }
      
      // Frontend format with heading/text sections
      return resource.content.map(section => `
        <div class="modal-section">
          <h3 class="modal-section-title">${section.heading || ''}</h3>
          <p class="modal-section-text">${section.text || section.body || ''}</p>
        </div>
      `).join('');
    }
    
    // Handle string content
    if (typeof resource.content === 'string') {
      return `<p class="modal-section-text">${resource.content}</p>`;
    }
    
    return '<p>Content coming soon...</p>';
  }
  
  // Open modal
  function openModal(slug) {
    const resource = getResourceBySlug(slug);
    if (!resource) {
      console.warn('Resource not found:', slug);
      return;
    }
    
    // Populate modal
    modalCategory.textContent = resource.category || '';
    modalTitle.textContent = resource.title || '';
    modalDescription.textContent = resource.fullDescription || resource.description || '';
    modalBody.innerHTML = generateContentHTML(resource);
    
    // Set action button
    const actionUrl = resource.actionUrl || resource.externalLink || resource.url || '#';
    const actionText = resource.actionText || 'Learn More';
    
    modalAction.href = actionUrl;
    modalAction.innerHTML = `
      ${actionText}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
    `;
    
    // Show modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    modalCloseBtn.focus();
    
    // Track analytics event if available
    if (typeof trackEvent === 'function') {
      trackEvent('resource_modal_open', resource.title);
    }
  }
  
  // Close modal
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  
  // Event listeners for cards
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      const slug = card.dataset.resourceSlug;
      if (slug) {
        openModal(slug);
      }
    });
    
    // Keyboard support
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const slug = card.dataset.resourceSlug;
        if (slug) {
          openModal(slug);
        }
      }
    });
  });
  
  // Close button events
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  
  if (modalCloseBtnSecondary) {
    modalCloseBtnSecondary.addEventListener('click', closeModal);
  }
  
  // Backdrop click closes modal
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }
  
  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
})();
