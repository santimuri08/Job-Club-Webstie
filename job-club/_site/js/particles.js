/**
 * Particle Network Background - AI Neural Network Effect
 */
(function() {
  'use strict';

  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let mouseX = null;
  let mouseY = null;

  // Configuration - INCREASED LINE VISIBILITY
  const config = {
    particleCount: 80,
    particleColor: 'rgba(220, 38, 38, 0.7)',
    lineColor: 'rgba(220, 38, 38, 0.35)',          // More visible (was 0.15)
    particleRadius: 2,
    lineDistance: 150,
    speed: 0.5,
    mouseRadius: 250,                               // Larger mouse radius
    mouseLineColor: 'rgba(255, 255, 255, 0.5)'     // More visible (was 0.2)
  };

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * config.speed;
      this.vy = (Math.random() - 0.5) * config.speed;
      this.radius = Math.random() * config.particleRadius + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Keep in bounds
      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = config.particleColor;
      ctx.fill();
    }
  }

  // Initialize canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Create particles
  function createParticles() {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Draw connections between nearby particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.lineDistance) {
          const opacity = 1 - (distance / config.lineDistance);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(220, 38, 38, ${opacity * 0.35})`;  // More visible
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw connections to mouse - MORE VISIBLE
      if (mouseX !== null && mouseY !== null) {
        const dx = particles[i].x - mouseX;
        const dy = particles[i].y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.mouseRadius) {
          const opacity = 1 - (distance / config.mouseRadius);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;  // More visible (was 0.3)
          ctx.lineWidth = 1.5;  // Slightly thicker for mouse lines
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw connections
    drawConnections();

    animationId = requestAnimationFrame(animate);
  }

  // Event listeners
  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });

  canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  canvas.addEventListener('mouseleave', () => {
    mouseX = null;
    mouseY = null;
  });

  // Initialize
  resizeCanvas();
  createParticles();
  animate();

})();