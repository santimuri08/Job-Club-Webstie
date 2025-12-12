/**
 * Introduction Page - Interactive 3D Cube
 */
(function() {
  'use strict';

  const cube = document.getElementById('intro-cube');
  const faceInfoIcon = document.getElementById('face-info-icon');
  const faceInfoTitle = document.getElementById('face-info-title');
  const faceInfoDesc = document.getElementById('face-info-desc');
  const faceInfo = document.getElementById('face-info');
  
  if (!cube) return;

  // Face information with SVG icons
  const faceData = {
    front: {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>`,
      title: 'Home',
      description: 'Your central hub for everything AI career related at NJIT.'
    },
    back: {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>`,
      title: 'Community',
      description: 'Connect with 200+ students, mentors, and industry professionals.'
    },
    right: {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>`,
      title: 'Events',
      description: 'Attend workshops, hack nights, and networking sessions.'
    },
    left: {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>`,
      title: 'Resources',
      description: 'Access curated tools, tutorials, and career templates.'
    },
    top: {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
      </svg>`,
      title: 'Career',
      description: 'Get personalized guidance to launch your AI career.'
    },
    bottom: {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>`,
      title: 'Learn',
      description: 'Build practical skills through hands-on projects.'
    }
  };

  let isDragging = false;
  let startX, startY;
  let rotateX = -15;
  let rotateY = 45;
  let autoRotate = true;
  let autoRotateInterval;
  let currentFace = 'front';

  // Update cube rotation
  function updateCube() {
    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  // Update face info panel
  function updateFaceInfo(face) {
    if (faceData[face] && face !== currentFace) {
      currentFace = face;
      const data = faceData[face];
      
      if (faceInfo) {
        faceInfo.classList.add('updating');
      }
      
      setTimeout(() => {
        if (faceInfoIcon) faceInfoIcon.innerHTML = data.icon;
        if (faceInfoTitle) faceInfoTitle.textContent = data.title;
        if (faceInfoDesc) faceInfoDesc.textContent = data.description;
        
        if (faceInfo) {
          faceInfo.classList.remove('updating');
        }
      }, 150);
    }
  }

  // Determine which face is most visible
  function detectVisibleFace() {
    let normalizedY = ((rotateY % 360) + 360) % 360;
    let normalizedX = rotateX % 360;
    if (normalizedX > 180) normalizedX -= 360;
    if (normalizedX < -180) normalizedX += 360;

    if (normalizedX < -50) {
      return 'top';
    } else if (normalizedX > 50) {
      return 'bottom';
    }

    if (normalizedY >= 315 || normalizedY < 45) {
      return 'front';
    } else if (normalizedY >= 45 && normalizedY < 135) {
      return 'left';
    } else if (normalizedY >= 135 && normalizedY < 225) {
      return 'back';
    } else if (normalizedY >= 225 && normalizedY < 315) {
      return 'right';
    }

    return 'front';
  }

  // Auto rotation
  function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
      if (autoRotate) {
        rotateY += 0.3;
        updateCube();
        const visibleFace = detectVisibleFace();
        updateFaceInfo(visibleFace);
      }
    }, 30);
  }

  function stopAutoRotate() {
    autoRotate = false;
  }

  function resumeAutoRotate() {
    setTimeout(() => {
      if (!isDragging) {
        autoRotate = true;
      }
    }, 3000);
  }

  // Event handlers
  function handleStart(e) {
    isDragging = true;
    stopAutoRotate();
    
    if (e.type === 'mousedown') {
      startX = e.clientX;
      startY = e.clientY;
    } else if (e.touches && e.touches[0]) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }
    
    cube.style.cursor = 'grabbing';
  }

  function handleMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    let clientX, clientY;
    if (e.type === 'mousemove') {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      return;
    }

    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    rotateY += deltaX * 0.5;
    rotateX -= deltaY * 0.5;
    rotateX = Math.max(-85, Math.min(85, rotateX));

    startX = clientX;
    startY = clientY;

    updateCube();
    const visibleFace = detectVisibleFace();
    updateFaceInfo(visibleFace);
  }

  function handleEnd() {
    if (!isDragging) return;
    isDragging = false;
    cube.style.cursor = 'grab';
    resumeAutoRotate();
  }

  // Event listeners
  cube.addEventListener('mousedown', handleStart);
  document.addEventListener('mousemove', handleMove);
  document.addEventListener('mouseup', handleEnd);
  cube.addEventListener('touchstart', handleStart, { passive: false });
  document.addEventListener('touchmove', handleMove, { passive: false });
  document.addEventListener('touchend', handleEnd);
  cube.addEventListener('contextmenu', (e) => e.preventDefault());

  // Initialize
  updateCube();
  updateFaceInfo(detectVisibleFace());
  startAutoRotate();

})();