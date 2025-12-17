/**
 * Events Page Handler
 * Slide-out drawer panel with internal registration
 * Compatible with both JSON fallback and Sanity CMS data
 */
(function() {
  'use strict';

  const eventsDataEl = document.getElementById('events-data');
  if (!eventsDataEl) return;
  
  let events;
  try {
    events = JSON.parse(eventsDataEl.textContent);
  } catch (e) {
    console.error('Failed to parse events data:', e);
    return;
  }
  
  // Tabs
  const tabs = document.querySelectorAll('.event-tab');
  const panels = document.querySelectorAll('.event-panel');
  
  // Drawer
  const drawer = document.getElementById('event-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerClose = document.getElementById('drawer-close');
  const eventListItems = document.querySelectorAll('.event-list-item');
  
  // Drawer Content
  const drawerCategory = document.getElementById('drawer-category');
  const drawerType = document.getElementById('drawer-type');
  const drawerTitle = document.getElementById('drawer-title');
  const drawerDescription = document.getElementById('drawer-description');
  const drawerDatetime = document.getElementById('drawer-datetime');
  const drawerLocation = document.getElementById('drawer-location');
  const drawerSpots = document.getElementById('drawer-spots');
  const spotsCard = document.getElementById('spots-card');
  const drawerMapSection = document.getElementById('drawer-map-section');
  const googleMapIframe = document.getElementById('google-map-iframe');
  const mapDirectionsLink = document.getElementById('map-directions-link');
  const speakersSection = document.getElementById('speakers-section');
  const drawerSpeakers = document.getElementById('drawer-speakers');
  const agendaSection = document.getElementById('agenda-section');
  const drawerAgenda = document.getElementById('drawer-agenda');
  const resourcesSection = document.getElementById('resources-section');
  const drawerResources = document.getElementById('drawer-resources');
  const drawerFullDescription = document.getElementById('drawer-full-description');
  
  // Actions
  const actionsUpcoming = document.getElementById('drawer-actions-upcoming');
  const registerInternalBtn = document.getElementById('register-internal-btn');
  const googleCalLink = document.getElementById('google-cal-link');
  const calendlyLink = document.getElementById('calendly-link');
  
  // Registration Modal
  const registrationModal = document.getElementById('registration-modal');
  const registrationModalBackdrop = document.getElementById('registration-modal-backdrop');
  const registrationModalClose = document.getElementById('registration-modal-close');
  const registrationModalEvent = document.getElementById('registration-modal-event');
  const registrationForm = document.getElementById('registration-form');
  const regQuestionsContainer = document.getElementById('reg-questions-container');
  const registrationSuccess = document.getElementById('registration-success');
  const registrationSuccessText = document.getElementById('registration-success-text');
  const addToCalendarAfterReg = document.getElementById('add-to-calendar-after-reg');
  const closeRegistrationSuccess = document.getElementById('close-registration-success');
  
  let currentEvent = null;
  
  // =============================
  // TAB FUNCTIONALITY
  // =============================
  
  function updateTabCounts() {
    const upcomingCount = events.filter(e => e.status === 'upcoming').length;
    const pastCount = events.filter(e => e.status === 'past').length;
    
    const upcomingCountEl = document.getElementById('upcoming-count');
    const pastCountEl = document.getElementById('past-count');
    
    if (upcomingCountEl) upcomingCountEl.textContent = upcomingCount;
    if (pastCountEl) pastCountEl.textContent = pastCount;
  }
  
  function switchTab(tabId) {
    tabs.forEach(tab => {
      const isActive = tab.dataset.tab === tabId;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive);
    });
    
    panels.forEach(panel => {
      const isActive = panel.id === `panel-${tabId}`;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });
  }
  
  // =============================
  // HELPER FUNCTIONS
  // =============================
  
  function convertTo24Hour(timeStr) {
    if (!timeStr) return '00:00:00';
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }
    
    return `${String(hours).padStart(2, '0')}:${minutes || '00'}:00`;
  }
  
  function getEventById(id) {
    return events.find(e => e.id === id || e.slug === id);
  }
  
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  // =============================
  // DRAWER FUNCTIONALITY
  // =============================
  
  function openDrawer(eventId) {
    currentEvent = getEventById(eventId);
    if (!currentEvent) return;
    
    populateDrawer(currentEvent);
    
    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => drawerClose.focus(), 100);
    
    // Track analytics event if available
    if (typeof trackEvent === 'function') {
      trackEvent('event_drawer_open', currentEvent.title);
    }
  }
  
  function closeDrawer() {
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    const activeItem = document.querySelector(`.event-list-item[data-event-id="${currentEvent?.id}"]`);
    if (activeItem) activeItem.focus();
    
    currentEvent = null;
  }
  
  function populateDrawer(event) {
    const isUpcoming = event.status === 'upcoming';
    const isVirtual = event.type === 'virtual' || event.location?.toLowerCase().includes('virtual') || event.location?.toLowerCase().includes('zoom');
    
    // Header
    if (drawerCategory) drawerCategory.textContent = event.category || 'Event';
    if (drawerType) {
      drawerType.innerHTML = isVirtual 
        ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> Virtual`
        : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> In-Person`;
    }
    if (drawerTitle) drawerTitle.textContent = event.title || '';
    if (drawerDescription) drawerDescription.textContent = event.description || '';
    if (drawerFullDescription) drawerFullDescription.textContent = event.fullDescription || event.description || '';
    
    // Date & Time
    if (drawerDatetime) {
      const dateFormatted = formatDate(event.date);
      const timeStr = event.time && event.endTime 
        ? `${event.time} - ${event.endTime} ${event.timezone || 'EST'}`
        : '';
      drawerDatetime.textContent = timeStr ? `${dateFormatted} • ${timeStr}` : dateFormatted;
    }
    
    // Location
    if (drawerLocation) drawerLocation.textContent = event.location || '';
    
    // Spots availability
    if (spotsCard) {
      if (isUpcoming && event.spotsLeft !== null && event.spotsTotal) {
        const percentage = Math.round(((event.spotsTotal - event.spotsLeft) / event.spotsTotal) * 100);
        drawerSpots.innerHTML = `
          <span>${event.spotsLeft} of ${event.spotsTotal} spots remaining</span>
          <div class="spots-bar">
            <div class="spots-bar-fill" style="width: ${percentage}%"></div>
          </div>
        `;
        spotsCard.hidden = false;
      } else {
        spotsCard.hidden = true;
      }
    }
    
    // Map for in-person events
    if (drawerMapSection) {
      if (!isVirtual && event.address) {
        const encodedAddress = encodeURIComponent(event.address);
        if (googleMapIframe) {
          googleMapIframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=-74.18%2C40.73%2C-74.16%2C40.75&layer=mapnik&marker=40.742,-74.178`;
        }
        if (mapDirectionsLink) {
          mapDirectionsLink.href = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
        }
        drawerMapSection.hidden = false;
      } else {
        drawerMapSection.hidden = true;
      }
    }
    
    // Speakers
    if (speakersSection && drawerSpeakers) {
      if (event.speakers && event.speakers.length > 0) {
        drawerSpeakers.innerHTML = event.speakers.map(speaker => `
          <div class="speaker-card-drawer">
            <div class="speaker-avatar-drawer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div class="speaker-info-drawer">
              <h4 class="speaker-name-drawer">${speaker.name || ''}</h4>
              <p class="speaker-title-drawer">${speaker.title || ''}</p>
              <p class="speaker-bio-drawer">${speaker.bio || ''}</p>
              ${speaker.linkedin ? `
                <a href="${speaker.linkedin}" class="speaker-linkedin" target="_blank" rel="noopener">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              ` : ''}
            </div>
          </div>
        `).join('');
        speakersSection.hidden = false;
      } else {
        speakersSection.hidden = true;
      }
    }
    
    // Agenda
    if (agendaSection && drawerAgenda) {
      if (event.agenda && event.agenda.length > 0) {
        drawerAgenda.innerHTML = event.agenda.map(item => `
          <div class="agenda-item">
            <span class="agenda-time">${item.time || ''}</span>
            <div class="agenda-content">
              <h4 class="agenda-title">${item.title || ''}</h4>
              <p class="agenda-description">${item.description || ''}</p>
            </div>
          </div>
        `).join('');
        agendaSection.hidden = false;
      } else {
        agendaSection.hidden = true;
      }
    }
    
    // Resources (for past events)
    if (resourcesSection && drawerResources) {
      if (event.resources && event.resources.length > 0) {
        drawerResources.innerHTML = event.resources.map(resource => `
          <a href="${resource.url || '#'}" class="resource-link-item" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            ${resource.title || 'Resource'}
          </a>
        `).join('');
        resourcesSection.hidden = false;
      } else {
        resourcesSection.hidden = true;
      }
    }
    
    // Actions - only show for upcoming events
    if (actionsUpcoming) {
      if (isUpcoming) {
        actionsUpcoming.hidden = false;
        if (googleCalLink) googleCalLink.href = generateGoogleCalendarUrl(event);
        if (calendlyLink) calendlyLink.href = event.calendlyUrl || 'https://calendly.com';
      } else {
        actionsUpcoming.hidden = true;
      }
    }
  }
  
  // =============================
  // CALENDAR FUNCTIONALITY
  // =============================
  
  function generateGoogleCalendarUrl(event) {
    if (!event.date) return '#';
    
    const startTime = convertTo24Hour(event.time);
    const endTime = convertTo24Hour(event.endTime);
    
    const startDate = new Date(`${event.date}T${startTime}`);
    const endDate = new Date(`${event.date}T${endTime}`);
    
    const formatDate = (date) => date.toISOString().replace(/-|:|\.\d{3}/g, '');
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title || 'Event',
      dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
      details: `${event.description || ''}\n\nMore info: ${window.location.href}`,
      location: event.address || event.location || '',
    });
    
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }
  
  // =============================
  // REGISTRATION FUNCTIONALITY
  // =============================
  
  function openRegistrationModal() {
    if (!currentEvent) return;
    
    if (registrationModalEvent) {
      registrationModalEvent.textContent = currentEvent.title;
    }
    
    if (regQuestionsContainer) {
      regQuestionsContainer.innerHTML = '';
      
      const questions = currentEvent.registration?.questions || [];
      if (questions.length > 0) {
        questions.forEach((question, index) => {
          const questionHtml = `
            <div class="form-group">
              <label class="form-label" for="reg-question-${index}">${question}</label>
              <input type="text" id="reg-question-${index}" name="question_${index}" class="form-input" placeholder="Your answer">
            </div>
          `;
          regQuestionsContainer.insertAdjacentHTML('beforeend', questionHtml);
        });
      }
    }
    
    if (registrationForm) {
      registrationForm.reset();
      registrationForm.hidden = false;
    }
    if (registrationSuccess) registrationSuccess.hidden = true;
    
    if (registrationModal) {
      registrationModal.classList.add('active');
      registrationModal.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      const nameInput = document.getElementById('reg-name');
      if (nameInput) nameInput.focus();
    }, 100);
  }
  
  function closeRegistrationModal() {
    if (registrationModal) {
      registrationModal.classList.remove('active');
      registrationModal.setAttribute('aria-hidden', 'true');
    }
    
    if (!drawer.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  }
  
  function handleRegistrationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(registrationForm);
    const data = Object.fromEntries(formData.entries());
    
    const name = data.name?.trim();
    const email = data.email?.trim();
    
    let hasError = false;
    
    const nameError = document.getElementById('reg-name-error');
    const nameInput = document.getElementById('reg-name');
    const emailError = document.getElementById('reg-email-error');
    const emailInput = document.getElementById('reg-email');
    
    if (!name) {
      if (nameError) nameError.textContent = 'Please enter your name';
      if (nameInput) nameInput.classList.add('error');
      hasError = true;
    } else {
      if (nameError) nameError.textContent = '';
      if (nameInput) nameInput.classList.remove('error');
    }
    
    if (!email || !isValidEmail(email)) {
      if (emailError) emailError.textContent = 'Please enter a valid email';
      if (emailInput) emailInput.classList.add('error');
      hasError = true;
    } else {
      if (emailError) emailError.textContent = '';
      if (emailInput) emailInput.classList.remove('error');
    }
    
    if (hasError) return;
    
    // Log registration (in production, send to API)
    console.log('Registration submitted:', {
      event: currentEvent.id,
      ...data
    });
    
    // Show success state
    if (registrationForm) registrationForm.hidden = true;
    if (registrationSuccess) registrationSuccess.hidden = false;
    if (registrationSuccessText) {
      registrationSuccessText.textContent = `You're registered for "${currentEvent.title}". We've sent a confirmation to ${email}.`;
    }
    
    // Update calendar link in success state
    if (addToCalendarAfterReg) {
      addToCalendarAfterReg.href = generateGoogleCalendarUrl(currentEvent);
    }
    
    // Track analytics if available
    if (typeof trackEvent === 'function') {
      trackEvent('event_registration', currentEvent.title);
    }
  }
  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  // =============================
  // EVENT LISTENERS
  // =============================
  
  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const direction = e.key === 'ArrowRight' ? 1 : -1;
        const tabsArr = Array.from(tabs);
        const currentIndex = tabsArr.indexOf(tab);
        const nextIndex = (currentIndex + direction + tabsArr.length) % tabsArr.length;
        tabsArr[nextIndex].focus();
        tabsArr[nextIndex].click();
      }
    });
  });
  
  // Event list item click
  eventListItems.forEach(item => {
    item.addEventListener('click', () => openDrawer(item.dataset.eventId));
    
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDrawer(item.dataset.eventId);
      }
    });
  });
  
  // Drawer close
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  
  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (registrationModal && registrationModal.classList.contains('active')) {
        closeRegistrationModal();
      } else if (drawer && drawer.classList.contains('active')) {
        closeDrawer();
      }
    }
  });
  
  // Registration modal
  if (registerInternalBtn) registerInternalBtn.addEventListener('click', openRegistrationModal);
  if (registrationModalClose) registrationModalClose.addEventListener('click', closeRegistrationModal);
  if (registrationModalBackdrop) registrationModalBackdrop.addEventListener('click', closeRegistrationModal);
  if (registrationForm) registrationForm.addEventListener('submit', handleRegistrationSubmit);
  if (closeRegistrationSuccess) closeRegistrationSuccess.addEventListener('click', closeRegistrationModal);
  
  // Focus trap in drawer
  if (drawer) {
    drawer.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      
      const focusableElements = drawer.querySelectorAll(
        'button:not([disabled]):not([hidden]), [href]:not([hidden]), input:not([disabled])'
      );
      const visibleElements = Array.from(focusableElements).filter(el => el.offsetParent !== null);
      
      if (visibleElements.length === 0) return;
      
      const firstElement = visibleElements[0];
      const lastElement = visibleElements[visibleElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    });
  }
  
  // Initialize
  updateTabCounts();

})();
