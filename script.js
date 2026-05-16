/* ============================================================
   DANIEL AMARAL ALVES // PORTFOLIO
   script.js
   ============================================================ */

/* ── DEVICE DETECTION ───────────────────────────────────────── */
const isTouch = () => window.matchMedia('(pointer: coarse)').matches;
const isTV    = () => window.innerWidth >= 1801;

/* ── CUSTOM CURSOR (PC/Notebook only) ───────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursor-trail');
  if (!cursor || !trail) return;

  // Hide on touch devices
  if (isTouch()) {
    cursor.style.display = 'none';
    trail.style.display  = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = (mx - 6) + 'px';
    cursor.style.top  = (my - 6) + 'px';
  });

  function animTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.left = (tx - 14) + 'px';
    trail.style.top  = (ty - 14) + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();

  // Hover state on interactive elements
  const interactiveSelector = 'a, button, .project-card, .tech-item, .tag, .phil-entry';
  document.querySelectorAll(interactiveSelector).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform  = 'scale(1.8)';
      cursor.style.background = 'transparent';
      cursor.style.border     = '1px solid var(--green)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform  = 'scale(1)';
      cursor.style.background = 'var(--green)';
      cursor.style.border     = 'none';
    });
  });
})();

/* ── LOADING SCREEN ─────────────────────────────────────────── */
(function initLoading() {
  const loadingEl  = document.getElementById('loading');
  const barEl      = document.getElementById('loading-bar');
  const textEl     = document.getElementById('loading-text');

  if (!loadingEl || !barEl || !textEl) return;

  const messages = [
    'INITIALIZING SYSTEM...',
    'LOADING ARCHIVE...',
    'DECRYPTING FILES...',
    'RENDERING INTERFACE...',
    'ACCESS GRANTED.'
  ];

  let progress = 0;
  let msgIdx   = 0;

  // TV gets a slightly faster loading (already a powerful device)
  const speed = isTV() ? 60 : 80;

  const interval = setInterval(() => {
    progress += Math.random() * 8 + 2;
    if (progress > 100) progress = 100;

    barEl.style.width = progress + '%';

    const newIdx = Math.floor(progress / 25);
    if (newIdx !== msgIdx && newIdx < messages.length) {
      msgIdx = newIdx;
      textEl.textContent = messages[msgIdx];
    }

    if (progress >= 100) {
      clearInterval(interval);
      textEl.textContent = 'ACCESS GRANTED.';
      setTimeout(() => {
        loadingEl.classList.add('hidden');
        // Start typing effect after load
        initTypingEffect();
      }, 600);
    }
  }, speed);
})();

/* ── TYPING EFFECT ──────────────────────────────────────────── */
function initTypingEffect() {
  const el = document.getElementById('hero-subtitle');
  if (!el) return;

  const fullText = el.textContent;
  el.textContent = '';
  let i = 0;

  // Slightly faster on TV (user is farther away, less patience)
  const speed = isTV() ? 30 : 40;

  const interval = setInterval(() => {
    el.textContent += fullText[i];
    i++;
    if (i >= fullText.length) clearInterval(interval);
  }, speed);
}

/* ── HAMBURGER NAV (Mobile) ─────────────────────────────────── */
(function initNav() {
  const hamburger = document.getElementById('nav-hamburger');
  const links     = document.getElementById('nav-links');
  if (!hamburger || !links) return;

  hamburger.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
    });
  });
})();

/* ── FADE UP ON SCROLL ──────────────────────────────────────── */
(function initScrollFade() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target); // fire once
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ── RANDOM GLITCH FLICKER ──────────────────────────────────── */
(function initGlitch() {
  function fire() {
    const glitches = document.querySelectorAll('.glitch');
    if (!glitches.length) return;
    const target = glitches[Math.floor(Math.random() * glitches.length)];
    // Force reflow to restart animation
    target.style.animation = 'none';
    void target.offsetHeight;
    target.style.animation = '';
    setTimeout(fire, 3000 + Math.random() * 6000);
  }
  setTimeout(fire, 2500);
})();

/* ── KONAMI CODE EASTER EGG ─────────────────────────────────── */
(function initEasterEgg() {
  const code = [38,38,40,40,37,39,37,39,66,65];
  let idx = 0;

  document.addEventListener('keydown', e => {
    if (e.keyCode === code[idx]) {
      idx++;
    } else {
      idx = 0;
    }

    if (idx === code.length) {
      idx = 0;
      showEasterEgg();
    }
  });

  function showEasterEgg() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: #030506;
      border: 1px solid #00ff88;
      padding: 32px 48px;
      font-family: 'Share Tech Mono', monospace;
      color: #00ff88;
      font-size: ${isTV() ? '18px' : '14px'};
      letter-spacing: 0.2em;
      z-index: 99999;
      text-align: center;
      box-shadow: 0 0 40px rgba(0,255,136,0.3);
      pointer-events: none;
    `;
    overlay.innerHTML =
      '&gt; ARQUIVO OCULTO ENCONTRADO<br><br>' +
      '<span style="color:#5a7a88;font-size:11px;">// você sabe o que procura.</span>';
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 3000);
  }
})();

/* ── TV: DISABLE CURSOR ANIMATIONS (performance) ───────────── */
(function initTVMode() {
  if (!isTV()) return;

  // On TV, users navigate with remote — hide custom cursor
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursor-trail');
  if (cursor) cursor.style.display = 'none';
  if (trail)  trail.style.display  = 'none';
  document.body.style.cursor = 'default';

  // Slightly reduce scanline intensity for large screens
  const style = document.createElement('style');
  style.textContent = `
    body::before { opacity: 0.5; }
    .vhs-mark { width: 32px; height: 32px; opacity: 0.2; }
  `;
  document.head.appendChild(style);
})();
