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

  // Face information - matches the cube faces
  const faceData = {
    front: {
      icon: '🏠',
      title: 'Home',
      description: 'Your central hub for everything AI career related at NJIT.'
    },
    back: {
      icon: '👥',
      title: 'Community',
      description: 'Connect with 200+ students, mentors, and industry professionals.'
    },
    right: {
      icon: '📅',
      title: 'Events',
      description: 'Attend workshops, hack nights, and networking sessions.'
    },
    left: {
      icon: '📚',
      title: 'Resources',
      description: 'Access curated tools, tutorials, and career templates.'
    },
    top: {
      icon: '🚀',
      title: 'Career',
      description: 'Get personalized guidance to launch your AI career.'
    },
    bottom: {
      icon: '💡',
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
      
      // Add transition effect
      if (faceInfo) {
        faceInfo.classList.add('updating');
      }
      
      setTimeout(() => {
        if (faceInfoIcon) faceInfoIcon.textContent = data.icon;
        if (faceInfoTitle) faceInfoTitle.textContent = data.title;
        if (faceInfoDesc) faceInfoDesc.textContent = data.description;
        
        if (faceInfo) {
          faceInfo.classList.remove('updating');
        }
      }, 150);
    }
  }

  // Determine which face is most visible (facing the viewer)
  function detectVisibleFace() {
    // Normalize angles to 0-360 range
    let normalizedY = ((rotateY % 360) + 360) % 360;
    
    // Normalize X to -180 to 180 range
    let normalizedX = rotateX % 360;
    if (normalizedX > 180) normalizedX -= 360;
    if (normalizedX < -180) normalizedX += 360;

    // Check top/bottom first (if tilted significantly)
    if (normalizedX < -50) {
      return 'top';
    } else if (normalizedX > 50) {
      return 'bottom';
    }

    // Determine which side face is showing based on Y rotation
    // FIXED: Swapped left and right to match actual cube rotation
    if (normalizedY >= 315 || normalizedY < 45) {
      return 'front';
    } else if (normalizedY >= 45 && normalizedY < 135) {
      return 'left';  // Fixed: was 'right'
    } else if (normalizedY >= 135 && normalizedY < 225) {
      return 'back';
    } else if (normalizedY >= 225 && normalizedY < 315) {
      return 'right';  // Fixed: was 'left'
    }

    return 'front';
  }

  // Auto rotation
  function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
      if (autoRotate) {
        rotateY += 0.3;
        updateCube();
        
        // Check and update face info every frame
        const visibleFace = detectVisibleFace();
        updateFaceInfo(visibleFace);
      }
    }, 30);
  }

  // Stop auto rotation
  function stopAutoRotate() {
    autoRotate = false;
  }

  // Resume auto rotation after delay
  function resumeAutoRotate() {
    setTimeout(() => {
      if (!isDragging) {
        autoRotate = true;
      }
    }, 3000);
  }

  // Mouse/Touch event handlers
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

    // FIXED: Increased rotation limit to allow viewing top/bottom faces
    rotateX = Math.max(-85, Math.min(85, rotateX));

    startX = clientX;
    startY = clientY;

    updateCube();
    
    // Update face info based on new rotation
    const visibleFace = detectVisibleFace();
    updateFaceInfo(visibleFace);
  }

  function handleEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    cube.style.cursor = 'grab';
    
    // Resume auto-rotate after 3 seconds of inactivity
    resumeAutoRotate();
  }

  // Add event listeners
  cube.addEventListener('mousedown', handleStart);
  document.addEventListener('mousemove', handleMove);
  document.addEventListener('mouseup', handleEnd);

  cube.addEventListener('touchstart', handleStart, { passive: false });
  document.addEventListener('touchmove', handleMove, { passive: false });
  document.addEventListener('touchend', handleEnd);

  // Prevent context menu on long press
  cube.addEventListener('contextmenu', (e) => e.preventDefault());

  // Initial setup
  updateCube();
  updateFaceInfo(detectVisibleFace());
  startAutoRotate();

})();