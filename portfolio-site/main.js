// ===== WCAG: only hide cursor for mouse users =====
document.body.classList.add('using-mouse');
document.addEventListener('keydown', () => document.body.classList.remove('using-mouse'));
document.addEventListener('mousedown', () => document.body.classList.add('using-mouse'));

// ===== 4-POINT STAR CURSOR (✦ shape) =====
const cursor = document.querySelector('.cursor');
if (cursor) {
  cursor.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2 L13.8 10.2 L22 12 L13.8 13.8 L12 22 L10.2 13.8 L2 12 L10.2 10.2 Z"
      fill="#BCD8EC" stroke="#2a6090" stroke-width="0.8" stroke-linejoin="round"/>
  </svg>`;
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .gondola-group, .gondola-outer, .stub, .skill-pill, .art-card, .marketing-card, .cs-other-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ===== SCROLL PROGRESS =====
const bar = document.querySelector('.scroll-progress');
if (bar) {
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
  });
}

// ===== STARS =====
function makeStars(container, n) {
  if (!container) return;
  for (let i = 0; i < n; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = 1 + Math.random() * 2.5;
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${size}px;height:${size}px;animation-delay:${Math.random()*4}s;animation-duration:${2+Math.random()*3}s;`;
    container.appendChild(s);
  }
}
document.querySelectorAll('.hero-stars').forEach(c => makeStars(c, 90));

// ===== HERO TEXT — words revealed by shooting star =====
const h1 = document.querySelector('.gate h1');
if (h1) {
  const rawHTML = h1.innerHTML;
  const parser = new DOMParser();
  const doc = parser.parseFromString('<div>' + rawHTML + '</div>', 'text/html');
  const nodes = [...doc.querySelector('div').childNodes];
  h1.innerHTML = '';

  // Build word spans — all start hidden, no animation yet
  const wordSpans = [];
  nodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent.split(/\s+/).filter(w => w.length > 0).forEach(w => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = w + ' ';
        h1.appendChild(span);
        wordSpans.push(span);
      });
    } else if (node.nodeName === 'EM') {
      node.textContent.split(/\s+/).filter(w => w.length > 0).forEach(w => {
        const em = document.createElement('em');
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = w + ' ';
        em.appendChild(span);
        h1.appendChild(em);
        wordSpans.push(span);
      });
    } else {
      const span = document.createElement('span');
      span.className = 'word';
      span.innerHTML = node.outerHTML || node.textContent;
      h1.appendChild(span);
      wordSpans.push(span);
    }
  });

  // Word reveal delays set by runNavStarAnimation() below
  // Store spans globally so the animation function can set delays
  window._heroWordSpans = wordSpans;
}

// ===== STRING LIGHTS =====
document.querySelectorAll('.string-lights').forEach(c => {
  for (let i = 0; i < 24; i++) {
    const b = document.createElement('div');
    b.className = 'bulb';
    // no stagger — all bulbs animate together
    c.appendChild(b);
  }
});

// ===== FADE UP =====
const fo = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fo.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-up').forEach(el => fo.observe(el));

// ===== PROJECTS DATA =====
const PROJECTS = [
  {
    num: 'Case Study 01', emoji: '🌾',
    title: 'Kisan4U',
    desc: 'Designed an accessible e-commerce platform for farmers and suppliers. Focused on low-literacy users — strengthening CTAs, simplifying navigation, and reducing friction through user research and usability testing.',
    tags: ['E-Commerce UX', 'Accessibility', 'User Research', 'Figma'],
    color: '#D6E5BD',
    link: 'kisan4u.html'
  },
  {
    num: 'Case Study 02', emoji: '🦆',
    title: 'GooseConnect',
    desc: 'A platform helping University of Waterloo students build authentic campus connections. Led research, journey mapping, prototyping, and coordination as Team Facilitator and UX Designer.',
    tags: ['App Design', 'UX Research', 'Prototyping', 'Community'],
    color: '#BCD8EC',
    link: 'gooseconnect.html'
  },
  {
    num: 'Case Study 03', emoji: '🏛️',
    title: 'Ontario Exposure Registry',
    desc: 'UX research and design for a public-facing government service at the Ontario Ministry of Transportation. Conducted interviews, usability testing, and synthesized findings into personas and journey maps.',
    tags: ['Government UX', 'Accessibility', 'Research', 'Agile'],
    color: '#DCCCE8',
    link: 'mto.html'
  },
  {
    num: 'Case Study 04', emoji: '🍫',
    title: "Willie's Chocolates",
    desc: 'Reimagined a modern-day Wonka brand — designing a magical, nostalgic digital chocolate experience for dreamers and nostalgics alike. Focused on brand storytelling and immersive UX.',
    tags: ['Brand UX', 'Visual Design', 'E-Commerce', 'Figma'],
    color: '#FFCBE1',
    link: 'willies.html'
  },
];

// ===== FERRIS WHEEL =====
const CX = 270, CY = 270, R = 210;
const GONDOLA_W = 113, GONDOLA_H = 82;

// 4 equally spaced gondolas: top (0), right (90), bottom (180), left (270)
const projectAngles = [0, 90, 180, 270];

function polar(deg, r) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function buildFerris() {
  const svg = document.getElementById('ferris-svg');
  const wg  = document.getElementById('fw-wheel');
  if (!svg || !wg) return;

  projectAngles.forEach((a, i) => {
    const pos = polar(a, R);
    const p = PROJECTS[i];
    const attachX = pos.x;
    const attachY = pos.y;

    // spoke
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', CX); line.setAttribute('y1', CY);
    line.setAttribute('x2', attachX); line.setAttribute('y2', attachY);
    line.setAttribute('stroke', 'rgba(188,216,236,0.5)');
    line.setAttribute('stroke-width', '2.5');
    wg.appendChild(line);

    // OUTER group handles counter-rotation (gravity fix)
    const outer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    outer.setAttribute('class', 'gondola-outer');
    outer.setAttribute('data-index', i);
    outer.dataset.cx = attachX;
    outer.dataset.cy = attachY;
    outer.style.transformBox = 'view-box';
    outer.style.transformOrigin = attachX + 'px ' + attachY + 'px';

    // INNER group handles sway animation
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'gondola-group');
    g.setAttribute('data-index', i);

    // cord
    const cord = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    cord.setAttribute('x1', attachX); cord.setAttribute('y1', attachY);
    cord.setAttribute('x2', attachX); cord.setAttribute('y2', attachY + 20);
    cord.setAttribute('stroke', 'rgba(188,216,236,.65)');
    cord.setAttribute('stroke-width', '2');
    g.appendChild(cord);

    // cart
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('class', 'gondola-rect');
    rect.setAttribute('x', attachX - GONDOLA_W / 2);
    rect.setAttribute('y', attachY + 20);
    rect.setAttribute('width', GONDOLA_W);
    rect.setAttribute('height', GONDOLA_H);
    rect.setAttribute('rx', '14');
    rect.setAttribute('fill', p.color);
    rect.setAttribute('stroke', 'rgba(42,96,144,0.35)');
    rect.setAttribute('stroke-width', '2');
    g.appendChild(rect);

    // emoji
    const emoji = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    emoji.setAttribute('x', attachX);
    emoji.setAttribute('y', attachY + 20 + Math.round(GONDOLA_H * 0.5));
    emoji.setAttribute('text-anchor', 'middle');
    emoji.setAttribute('dominant-baseline', 'middle');
    emoji.setAttribute('font-size', '28');
    emoji.textContent = p.emoji;
    g.appendChild(emoji);

    // number label
    const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    lbl.setAttribute('x', attachX);
    lbl.setAttribute('y', attachY + 20 + GONDOLA_H - 8);
    lbl.setAttribute('text-anchor', 'middle');
    lbl.setAttribute('font-size', '9');
    lbl.setAttribute('font-family', 'DM Mono, monospace');
    lbl.setAttribute('fill', 'rgba(29,63,94,0.6)');
    lbl.textContent = String(i + 1).padStart(2, '0');
    g.appendChild(lbl);

    outer.appendChild(g);
    wg.appendChild(outer);
  });
}
buildFerris();

// ===== FERRIS INTERACTION =====
const ferrisSection = document.getElementById('ferris-section');
const ferrisInner   = document.querySelector('.ferris-inner');
const wheelGroup    = document.getElementById('fw-wheel');
const previewCard   = document.querySelector('.preview-card');

let currentProject = -1;
let hasSplit = false;
let currentRotation = 0;

function applyGondolaCounterRotation(rotation) {
  document.querySelectorAll('.gondola-outer').forEach(outer => {
    const cx = parseFloat(outer.dataset.cx);
    const cy = parseFloat(outer.dataset.cy);
    outer.style.transformBox = 'view-box';
    outer.style.transformOrigin = cx + 'px ' + cy + 'px';
    outer.style.transition = 'transform 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    outer.style.transform = 'rotate(' + (-rotation) + 'deg)';
  });
}

function swayGondolas() {
  document.querySelectorAll('.gondola-group').forEach(g => {
    g.classList.remove('gondola-sway');
    void g.offsetWidth;
    g.classList.add('gondola-sway');
    setTimeout(() => g.classList.remove('gondola-sway'), 1500);
  });
}

function goToProject(index) {
  if (index === currentProject) return;
  currentProject = index;

  // Bring selected gondola to the right (90deg = 3 o'clock)
  const angle = projectAngles[index];
  const rotation = -(angle - 90);
  currentRotation = rotation;

  wheelGroup.style.transition = 'transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94)';
  wheelGroup.style.transform = 'rotate(' + rotation + 'deg)';

  applyGondolaCounterRotation(rotation);

  setTimeout(swayGondolas, 900);

  document.querySelectorAll('.gondola-outer').forEach((outer, i) => {
    outer.classList.toggle('active-outer', i === index);
  });
  document.querySelectorAll('.gondola-group').forEach((g, i) => {
    g.classList.toggle('active', i === index);
  });

  updatePreview(index);
}

function buildPreviewHTML(p) {
  return '<div class="preview-card-inner">' +
    '<div class="preview-img" style="background:' + p.color + '">' +
    '<span style="font-size:6rem">' + p.emoji + '</span>' +
    '</div>' +
    '<div class="preview-body">' +
    '<div class="preview-num">' + p.num + '</div>' +
    '<h3 class="preview-title">' + p.title + '</h3>' +
    '<p class="preview-desc">' + p.desc + '</p>' +
    '<div class="preview-tags">' + p.tags.map(t => '<span class="preview-tag">' + t + '</span>').join('') + '</div>' +
    '<a href="' + p.link + '" class="btn-view">View case study →</a>' +
    '</div></div>';
}

if (previewCard) {
  previewCard.innerHTML = buildPreviewHTML(PROJECTS[0]);
}

function updatePreview(index) {
  if (!previewCard) return;
  previewCard.classList.remove('visible');
  setTimeout(() => {
    previewCard.innerHTML = buildPreviewHTML(PROJECTS[index]);
    previewCard.classList.add('visible');
  }, 130);
}

window.addEventListener('scroll', () => {
  if (!ferrisSection || !ferrisInner) return;
  const rect = ferrisSection.getBoundingClientRect();
  const scrolled = -rect.top;
  const total = ferrisSection.offsetHeight - window.innerHeight;

  if (scrolled > window.innerHeight * 0.25 && !hasSplit) {
    hasSplit = true;
    ferrisInner.classList.add('split');
    setTimeout(() => goToProject(0), 250);
  } else if (scrolled <= window.innerHeight * 0.15 && hasSplit) {
    hasSplit = false;
    ferrisInner.classList.remove('split');
    currentProject = -1;
  }

  if (hasSplit && total > 0) {
    const progress = Math.max(0, Math.min((scrolled - window.innerHeight * 0.25) / (total * 0.85), 1));
    const idx = Math.min(Math.floor(progress * PROJECTS.length), PROJECTS.length - 1);
    goToProject(idx);
  }
});

// Gondola click
document.getElementById('ferris-svg')?.addEventListener('click', e => {
  const g = e.target.closest('.gondola-group');
  if (!g) return;
  const idx = parseInt(g.dataset.index);
  if (!hasSplit) {
    hasSplit = true;
    ferrisInner.classList.add('split');
    setTimeout(() => goToProject(idx), 250);
  } else {
    goToProject(idx);
  }
});

// ===== SMOOTH SCROLL (with nav offset, fixed for #contact) =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    const t = document.querySelector(href);
    if (t) {
      e.preventDefault();
      const top = t.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== BACK TO TOP — DROP TOWER with scroll-driven car =====
const btt = document.getElementById('backToTop');
const bttCarGroup = document.querySelector('.btt-car-group');

if (btt) {
  // Show/hide button + move car with scroll
  function updateBtt() {
    const scrollY = window.scrollY;
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    btt.classList.toggle('visible', scrollY > 400);

    if (bttCarGroup && scrollMax > 0) {
      // Car travels from top of tower (offset -20) to bottom (offset +28) as page scrolls
      const progress = Math.min(scrollY / scrollMax, 1);
      const yOffset = -20 + progress * 48;
      bttCarGroup.setAttribute('transform', 'translate(0,' + yOffset + ')');
    }
  }
  window.addEventListener('scroll', updateBtt, { passive: true });
  updateBtt(); // init

  btt.addEventListener('click', () => {
    btt.classList.add('launching');
    setTimeout(() => btt.classList.remove('launching'), 800);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== NAV STAR → SHOOTING STAR → RETURNS =====
function runNavStarAnimation() {
  const navStar = document.querySelector('.nav-star');
  if (!navStar) return;

  const navRect    = navStar.getBoundingClientRect();
  const startX     = navRect.left + navRect.width  / 2;
  const startY     = navRect.top  + navRect.height / 2;
  const h1El       = document.querySelector('.gate h1');
  const heroY      = h1El
    ? h1El.getBoundingClientRect().top + h1El.getBoundingClientRect().height / 2
    : startY;

  // Create flyer element
  const flyer = document.createElement('div');
  flyer.id = 'nav-star-flyer';
  flyer.setAttribute('aria-hidden', 'true');
  flyer.innerHTML = '<span class="flyer-beam"></span><span class="flyer-star">✦</span>';
  document.body.appendChild(flyer);
  const beam = flyer.querySelector('.flyer-beam');

  // Timing constants (ms)
  const GLOW_IN   = 320;   // glow at nav before shooting
  const SHOOT     = 1480;  // travel across viewport
  const GLOW_OUT  = 700;   // settle glow after return

  // Set word reveal delays to sync with star crossing the hero text
  const spans = window._heroWordSpans || [];
  spans.forEach((span, i) => {
    span.style.animationDelay = (GLOW_IN / 1000 + 0.06 + i * 0.13) + 's';
  });

  navStar.style.opacity = '0'; // hide real star while flyer is active

  let t0 = null;
  function tick(ts) {
    if (!t0) t0 = ts;
    const ms = ts - t0;

    if (ms < GLOW_IN) {
      // Phase 1: glow in nav
      const p = ms / GLOW_IN;
      flyer.style.cssText =
        'left:' + startX + 'px;top:' + startY + 'px;opacity:' + Math.min(p * 2, 1) + ';';
      beam.style.width = '0px';

    } else if (ms < GLOW_IN + SHOOT) {
      // Phase 2: shoot across hero
      const p  = (ms - GLOW_IN) / SHOOT;
      // cubic ease-out
      const ep = 1 - Math.pow(1 - p, 3);
      const x  = startX + ep * (window.innerWidth + 200);
      // arc down to hero text level, then level off
      const dy = heroY - startY;
      const y  = startY + dy * Math.min(p * 5, 1);
      const op = p < 0.87 ? 1 : Math.max(0, 1 - (p - 0.87) / 0.13);

      flyer.style.cssText =
        'left:' + x + 'px;top:' + y + 'px;opacity:' + op + ';';
      beam.style.width = Math.min(p * 6, 1) * 150 + 'px';

    } else {
      // Phase 3: return — flyer disappears, real nav star glows back
      flyer.remove();
      navStar.style.opacity = '1';
      navStar.classList.add('glowing');
      setTimeout(() => navStar.classList.remove('glowing'), GLOW_OUT);
      return; // stop loop
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Run after short paint delay so getBoundingClientRect is accurate
setTimeout(runNavStarAnimation, 80);
