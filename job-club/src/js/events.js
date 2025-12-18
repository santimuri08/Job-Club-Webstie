/**
 * Events Page JavaScript
 * Handles tabs, drawer, and Calendly registration
 */
(function() {
  'use strict';

  // ============ DOM Elements ============
  const tabs = document.querySelectorAll('.event-tab');
  const panels = document.querySelectorAll('.event-panel');
  const drawer = document.getElementById('event-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerClose = document.getElementById('drawer-close');
  
  // Get events data from script tag
  let eventsData = [];
  const eventsDataScript = document.getElementById('events-data');
  if (eventsDataScript) {
    try {
      eventsData = JSON.parse(eventsDataScript.textContent);
      console.log('Events loaded:', eventsData.length);
    } catch (e) {
      console.error('Failed to parse events data:', e);
    }
  }

  // ============ Tab Switching ============
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

  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // ============ Event Drawer ============
  let currentEvent = null;

  function openDrawer(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) {
      console.error('Event not found:', eventId);
      return;
    }

    currentEvent = event;
    populateDrawer(event);
    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    setTimeout(() => {
      if (drawerClose) drawerClose.focus();
    }, 100);
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    currentEvent = null;
  }

  function populateDrawer(event) {
    // Basic info
    const categoryEl = document.getElementById('drawer-category');
    const titleEl = document.getElementById('drawer-title');
    const descEl = document.getElementById('drawer-description');
    
    if (categoryEl) categoryEl.textContent = event.category || 'Event';
    if (titleEl) titleEl.textContent = event.title;
    if (descEl) descEl.textContent = event.description;
    
    // Type badge
    const typeEl = document.getElementById('drawer-type');
    if (typeEl) {
      if (event.type === 'virtual') {
        typeEl.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="3" width="20" height="14" rx="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
          Virtual
        `;
        typeEl.className = 'drawer-type event-type-virtual';
      } else {
        typeEl.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          In-Person
        `;
        typeEl.className = 'drawer-type event-type-in-person';
      }
    }

    // Date and time
    const datetimeEl = document.getElementById('drawer-datetime');
    if (datetimeEl && event.date) {
      const dateObj = new Date(event.date);
      const formattedDate = dateObj.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      datetimeEl.textContent = `${formattedDate} • ${event.time || ''}`;
    }
    
    const locationEl = document.getElementById('drawer-location');
    if (locationEl) locationEl.textContent = event.location || '';

    // Full description
    const fullDescEl = document.getElementById('drawer-full-description');
    if (fullDescEl) {
      fullDescEl.textContent = event.fullDescription || event.description;
    }

    // Spots availability (for upcoming events)
    const spotsCard = document.getElementById('spots-card');
    if (spotsCard) {
      if (event.status === 'upcoming' && event.spotsTotal) {
        spotsCard.hidden = false;
        const spotsInfo = document.getElementById('drawer-spots');
        if (spotsInfo) {
          const percentFilled = ((event.spotsTotal - (event.spotsLeft || 0)) / event.spotsTotal) * 100;
          spotsInfo.innerHTML = `
            <strong>${event.spotsLeft || 0}</strong> of ${event.spotsTotal} spots remaining
            <div class="spots-bar">
              <div class="spots-bar-fill" style="width: ${percentFilled}%"></div>
            </div>
          `;
        }
      } else {
        spotsCard.hidden = true;
      }
    }

    // Speakers
    const speakersSection = document.getElementById('speakers-section');
    const speakersList = document.getElementById('drawer-speakers');
    if (speakersSection && speakersList) {
      if (event.speakers && event.speakers.length > 0) {
        speakersSection.hidden = false;
        speakersList.innerHTML = event.speakers.map(speaker => `
          <div class="speaker-card-drawer">
            <div class="speaker-avatar-drawer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div class="speaker-info-drawer">
              <h4 class="speaker-name-drawer">${speaker.name}</h4>
              <p class="speaker-title-drawer">${speaker.title || ''}${speaker.organization ? ` at ${speaker.organization}` : ''}</p>
              ${speaker.bio ? `<p class="speaker-bio-drawer">${speaker.bio}</p>` : ''}
            </div>
          </div>
        `).join('');
      } else {
        speakersSection.hidden = true;
      }
    }

    // Agenda
    const agendaSection = document.getElementById('agenda-section');
    const agendaList = document.getElementById('drawer-agenda');
    if (agendaSection && agendaList) {
      if (event.agenda && event.agenda.length > 0) {
        agendaSection.hidden = false;
        agendaList.innerHTML = event.agenda.map(item => `
          <div class="agenda-item">
            <span class="agenda-time">${item.time}</span>
            <div class="agenda-content">
              <h4 class="agenda-title">${item.title}</h4>
              ${item.description ? `<p class="agenda-description">${item.description}</p>` : ''}
            </div>
          </div>
        `).join('');
      } else {
        agendaSection.hidden = true;
      }
    }

    // Resources (for past events)
    const resourcesSection = document.getElementById('resources-section');
    const resourcesList = document.getElementById('drawer-resources');
    if (resourcesSection && resourcesList) {
      if (event.resources && event.resources.length > 0) {
        resourcesSection.hidden = false;
        resourcesList.innerHTML = event.resources.map(resource => `
          <a href="${resource.url}" class="resource-link-item" target="_blank" rel="noopener">
            ${getResourceIcon(resource.type)}
            ${resource.title}
          </a>
        `).join('');
      } else {
        resourcesSection.hidden = true;
      }
    }

    // Action buttons based on event status
    const actionsUpcoming = document.getElementById('drawer-actions-upcoming');
    const actionsPast = document.getElementById('drawer-actions-past');
    
    if (event.status === 'upcoming') {
      if (actionsUpcoming) actionsUpcoming.hidden = false;
      if (actionsPast) actionsPast.hidden = true;
      
      // Calendly button - use event's calendly link or default
      const calendlyBtn = document.getElementById('calendly-register-btn');
      if (calendlyBtn) {
        // Default Calendly URL - replace YOUR_CALENDLY with actual username
        const calendlyUrl = event.calendlyUrl || event.registrationUrl || 'https://calendly.com/njit-jobclub';
        calendlyBtn.href = calendlyUrl;
      }
      
      // Google Calendar link
      const googleCalLink = document.getElementById('google-cal-link');
      if (googleCalLink) {
        googleCalLink.href = generateGoogleCalendarUrl(event);
      }
      
      // iCal download
      const icalLink = document.getElementById('ical-link');
      if (icalLink) {
        icalLink.href = generateICalUrl(event);
      }
    } else {
      if (actionsUpcoming) actionsUpcoming.hidden = true;
      if (actionsPast) actionsPast.hidden = false;
      
      // Recording button for past events
      const recordingBtn = document.getElementById('watch-recording-btn');
      if (recordingBtn) {
        if (event.recordingUrl) {
          recordingBtn.hidden = false;
          recordingBtn.href = event.recordingUrl;
        } else {
          recordingBtn.hidden = true;
        }
      }
    }
  }

  function getResourceIcon(type) {
    const icons = {
      video: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
      slides: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
      doc: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
      github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
      link: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`
    };
    return icons[type] || icons.link;
  }

  function generateGoogleCalendarUrl(event) {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description || '');
    const location = encodeURIComponent(event.location || '');
    
    // Parse date
    const dateStr = event.date ? event.date.split('T')[0].replace(/-/g, '') : '';
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}/${dateStr}&details=${details}&location=${location}`;
  }

  function generateICalUrl(event) {
    const title = event.title || 'Event';
    const description = event.description || '';
    const location = event.location || '';
    const dateStr = event.date ? event.date.split('T')[0].replace(/-/g, '') : '';
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${dateStr}`,
      `DTEND:${dateStr}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');
    
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsContent);
  }

  // ============ Event Listeners ============
  
  // Click handler for event items
  function handleEventClick(e) {
    const eventItem = e.target.closest('.event-list-item');
    if (eventItem) {
      const eventId = eventItem.dataset.eventId;
      if (eventId) {
        openDrawer(eventId);
      }
    }
  }

  // Attach click listeners to event lists
  const upcomingList = document.getElementById('upcoming-events-list');
  const pastList = document.getElementById('past-events-list');
  
  if (upcomingList) {
    upcomingList.addEventListener('click', handleEventClick);
  }
  
  if (pastList) {
    pastList.addEventListener('click', handleEventClick);
  }

  // Keyboard support for event items
  document.querySelectorAll('.event-list-item').forEach(item => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const eventId = item.dataset.eventId;
        if (eventId) openDrawer(eventId);
      }
    });
  });

  // Drawer close handlers
  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }
  
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  // Escape key to close drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // Log initialization
  console.log('Events page initialized');

})();
