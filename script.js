/* ============================================
   CYBERPUNK PORTFOLIO — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==============================
  // HOLISTIC LOADER
  // ==============================
  const loader = document.getElementById('loader');
  const loaderProgress = document.querySelector('.loader-progress');
  const body = document.body;

  if (loader && loaderProgress) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add('fade-out');
          body.classList.remove('loading');
        }, 1200);
      }
      loaderProgress.style.width = `${progress}%`;
    }, 120);
  }

  // ==============================
  // 3D HERO TILT & OPTIC SYNC
  // ==============================
  const heroName = document.querySelector('.hero-name');

  window.addEventListener('mousemove', (e) => {
    const xRel = (e.clientX / window.innerWidth - 0.5);
    const yRel = (e.clientY / window.innerHeight - 0.5);

    // Hero name advanced 3D tilt
    if (heroName) {
      const tiltX = yRel * 25; // increased for depth
      const tiltY = -xRel * 25;
      heroName.style.transform = `perspective(2000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    }
  });

  // Small glitch burst on startup
  if (heroName) {
    setTimeout(() => {
      heroName.classList.add('glitch-burst');
      setTimeout(() => heroName.classList.remove('glitch-burst'), 500);
    }, 2000);
  }

  // ==============================
  // GLOBAL MOUSE LIGHTING EFFECT
  // ==============================
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    document.documentElement.style.setProperty('--mouse-global-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-global-y', `${y}px`);
  }, { passive: true });

  // ==============================
  // MOBILE NAVIGATION
  // ==============================
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // ==============================
  // SCROLL PROGRESS BAR
  // ==============================
  const scrollBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPos = window.pageYOffset;
    const progress = (scrollPos / totalHeight) * 100;
    if (scrollBar) scrollBar.style.width = `${progress}%`;
  }, { passive: true });

  // ==============================
  // BACKGROUND DIGITAL DECOR
  // ==============================
  const decorContainer = document.getElementById('bg-decor-container');
  if (decorContainer) {
    const hexChars = '0123456789ABCDEF-X-Y-Z';
    const DECOR_COUNT = 24;

    for (let i = 0; i < DECOR_COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'decor-hex';
      let hexStr = '';
      for (let j = 0; j < 6; j++) hexStr += hexChars[Math.floor(Math.random() * hexChars.length)];
      el.textContent = `0x${hexStr}`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.left = `${Math.random() * 100}%`;
      el.style.animation = `fadePulse ${5 + Math.random() * 8}s infinite alternate`;
      el.style.animationDelay = `${Math.random() * 5}s`;
      decorContainer.appendChild(el);
    }
  }

  // ==============================
  // DATA STREAMS (Binary)
  // ==============================
  const STREAM_COUNT = 15;
  for (let i = 0; i < STREAM_COUNT; i++) {
    const stream = document.createElement('div');
    stream.className = 'data-stream';
    let content = '';
    for (let j = 0; j < 30; j++) content += Math.random() > 0.5 ? '1' : '0';
    stream.textContent = content;
    stream.style.left = `${Math.random() * 100}%`;
    stream.style.animationDuration = `${15 + Math.random() * 25}s`;
    stream.style.animationDelay = `${Math.random() * -20}s`;
    document.body.appendChild(stream);
  }

  // ==============================
  // DIGITAL THUNDER RAIN
  // ==============================
  // ==============================
  // SIDE THUNDER SPARKING
  // ==============================
  function triggerThunder() {
    // 1. Small Lightning Sparks (Targeting Sides)
    // Only spawning on the far left (0-15%) or far right (85-100%)
    const isLeft = Math.random() > 0.5;
    const xPos = isLeft ? Math.random() * 12 : 88 + (Math.random() * 12);

    const bolt = document.createElement('div');
    bolt.className = 'lightning-bolt bolt-active';
    bolt.style.left = `${xPos}vw`;
    bolt.style.top = `${Math.random() * 80}vh`;
    // Skew to make them look more like lightning strikes
    bolt.style.transform = `skewX(${(Math.random() - 0.5) * 30}deg)`;

    document.body.appendChild(bolt);
    setTimeout(() => bolt.remove(), 400);

    // Strike frequently but only on the periphery (approx every 1-4 seconds)
    setTimeout(triggerThunder, 1000 + Math.random() * 3000);
  }

  // Start the peripheral storm
  setTimeout(triggerThunder, 2000);

  // ==============================
  // FLOATING PARTICLES (Hero)
  // ==============================
  const canvas = document.getElementById('hero-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.1
      };
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    initParticles();
    drawParticles();
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });
  }

  // ==============================
  // ENHANCED SECTION REVEAL
  // ==============================
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
  });

  // ==============================
  // STAGGERED FADE-IN (Item level)
  // ==============================
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter(c => c.classList.contains('fade-in'));
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.15}s`;
        }
        entry.target.classList.add('visible-item');
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

  const fadeTargets = [
    '.terminal', '.skill-card', '.timeline-item', '.project-card',
    '.extra-item', '.hobby-card', '.contact-card', '.soft-skills'
  ];

  fadeTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('fade-in');
      itemObserver.observe(el);
    });
  });

  // ==============================
  // SKILL BARS ANIMATED FILL
  // ==============================
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) {
          fill.style.width = getComputedStyle(fill).getPropertyValue('--fill');
        }
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-card').forEach(card => {
    const fill = card.querySelector('.skill-fill');
    if (fill) fill.style.width = '0%';
    skillObserver.observe(card);
  });

  // ==============================
  // SECTION TITLE REVEAL (Typing)
  // ==============================
  function typeTitle(el) {
    const text = el.dataset.text;
    if (!text) return;
    el.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 50);
  }

  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('title-visible');
        typeTitle(entry.target);
        titleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.section-title').forEach(title => {
    title.dataset.text = title.textContent;
    title.textContent = '';
    titleObserver.observe(title);
  });

  // ==============================
  // PARALLAX TILT FOR CARDS
  // ==============================
  const tiltCards = document.querySelectorAll('.skill-card, .project-card, .hobby-card, .contact-card, .timeline-card, .terminal');
   tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((centerX - x) / centerX) * 10;

      card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1500px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
    });
  });

  // ==============================
  // RANDOM GLITCH BURST ON NAME
  // ==============================
  if (heroName) {
    setInterval(() => {
      heroName.classList.add('glitch-burst');
      setTimeout(() => heroName.classList.remove('glitch-burst'), 200);
    }, 4500);
  }
});
