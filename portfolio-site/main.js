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

// ===== HERO TEXT ANIMATION (word spacing fixed with white-space:pre) =====
const h1 = document.querySelector('.gate h1');
if (h1) {
  const html = h1.innerHTML;
  const parser = new DOMParser();
  const doc = parser.parseFromString('<div>' + html + '</div>', 'text/html');
  const nodes = [...doc.querySelector('div').childNodes];
  h1.innerHTML = '';
  let delay = 0.1;

  nodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.split(/\s+/).filter(w => w.length > 0);
      words.forEach(w => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = w + ' ';
        span.style.animationDelay = delay + 's';
        h1.appendChild(span);
        delay += 0.12;
      });
    } else if (node.nodeName === 'EM') {
      const words = node.textContent.split(/\s+/).filter(w => w.length > 0);
      words.forEach(w => {
        const em = document.createElement('em');
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = w + ' ';
        span.style.animationDelay = delay + 's';
        em.appendChild(span);
        h1.appendChild(em);
        delay += 0.12;
      });
    } else {
      const span = document.createElement('span');
      span.className = 'word';
      span.innerHTML = node.outerHTML || node.textContent;
      span.style.animationDelay = delay + 's';
      h1.appendChild(span);
      delay += 0.12;
    }
  });
}

// ===== STRING LIGHTS =====
document.querySelectorAll('.string-lights').forEach(c => {
  for (let i = 0; i < 24; i++) {
    const b = document.createElement('div');
    b.className = 'bulb';
    b.style.animationDelay = (i * 0.1) + 's';
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
const GONDOLA_W = 90, GONDOLA_H = 65;

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

  // FIX: Force the main wheel group to pivot exactly around the center hub axle
  wg.style.transformBox = 'view-box';
  wg.style.transformOrigin = `${CX}px ${CY}px`;

  projectAngles.forEach((a, i) => {
    const pos = polar(a, R);
    const p = PROJECTS[i];
    const attachX = pos.x;
    const attachY = pos.y;

    // spoke
    const line = document.createElementNS('http://w3.org', 'line');
    line.setAttribute('x1', CX); line.setAttribute('y1', CY);
    line.setAttribute('x2', attachX); line.setAttribute('y2', attachY);
    line.setAttribute('stroke', 'rgba(188,216,236,0.5)');
    line.setAttribute('stroke-width', '2.5');
    wg.appendChild(line);

    // OUTER group handles counter-rotation (gravity fix)
    const outer = document.createElementNS('http://w3.org', 'g');
    outer.setAttribute('class', 'gondola-outer');
    outer.setAttribute('data-index', i);
    outer.dataset.cx = attachX;
    outer.dataset.cy = attachY;
    
    // FIX: Explicitly lock the counter-rotation pivot point to the specific spoke tip attachment coordinate
    outer.style.transformBox = 'view-box';
    outer.style.transformOrigin = `${attachX}px ${attachY}px`;

    // INNER group handles sway animation
    const g = document.createElementNS('http://w3.org', 'g');
    g.setAttribute('class', 'gondola-group');
    g.setAttribute('data-index', i);
    g.style.transformBox = 'view-box';
    g.style.transformOrigin = `${attachX}px ${attachY}px`;

    // cord
    const cord = document.createElementNS('http://w3.org', 'line');
    cord.setAttribute('x1', attachX); cord.setAttribute('y1', attachY);
    cord.setAttribute('x2', attachX); cord.setAttribute('y2', attachY + 20);
    cord.setAttribute('stroke', 'rgba(188,216,236,.65)');
    cord.setAttribute('stroke-width', '2');
    g.appendChild(cord);

    // cart
    const rect = document.createElementNS('http://w3.org', 'rect');
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
    const emoji = document.createElementNS('http://w3.org', 'text');
    emoji.setAttribute('x', attachX);
    emoji.setAttribute('y', attachY + 20 + Math.round(GONDOLA_H * 0.5));
    emoji.setAttribute('text-anchor', 'middle');
    emoji.setAttribute('dominant-baseline', 'middle');
    emoji.setAttribute('font-size', '28');
    emoji.textContent = p.emoji;
    g.appendChild(emoji);

    // number label
    const lbl = document.createElementNS('http://w3.org', 'text');
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

// ===== FERRIS INTERACTION (SMOOTH INERTIA ENGINE) =====
const ferrisSection = document.getElementById('ferris-section');
const ferrisInner   = document.querySelector('.ferris-inner');
const wheelGroup    = document.getElementById('fw-wheel');
const previewCard   = document.querySelector('.preview-card');

let currentProject = -1;
let hasSplit = false;

// Inertia tracking parameters
let currentRotation = 0;
let targetRotation = 0;
let isUserClicking = false; 
const easeFactor = 0.08; 

function updateActiveStates(index) {
  if (index === currentProject) return;
  currentProject = index;

  document.querySelectorAll('.gondola-outer').forEach((outer, i) => {
    outer.classList.toggle('active-outer', i === index);
  });
  document.querySelectorAll('.gondola-group').forEach((g, i) => {
    g.classList.toggle('active', i === index);
  });

  updatePreview(index);
}

function goToProject(index) {
  isUserClicking = true;
  
  const angle = projectAngles[index];
  targetRotation = -(angle - 90);

  // Smooth CSS snaps for manual navigation clicks
  wheelGroup.style.transition = 'transform 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  wheelGroup.style.transform = `rotate(${targetRotation}deg)`;
  
  document.querySelectorAll('.gondola-outer').forEach(outer => {
    outer.style.transition = 'transform 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    outer.style.transform = `rotate(${-targetRotation}deg)`;
  });

  currentRotation = targetRotation;
  updateActiveStates(index);

  setTimeout(() => {
    isUserClicking = false;
  }, 850);
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

if (previewCard && typeof PROJECTS !== 'undefined' && PROJECTS[0]) {
  previewCard.innerHTML = buildPreviewHTML(PROJECTS[0]);
}

function updatePreview(index) {
  if (!previewCard || typeof PROJECTS === 'undefined' || !PROJECTS[index]) return;
  previewCard.classList.remove('visible');
  setTimeout(() => {
    previewCard.innerHTML = buildPreviewHTML(PROJECTS[index]);
    previewCard.classList.add('visible');
  }, 130);
}

// Global Scroll Processing
window.addEventListener('scroll', () => {
  if (!ferrisSection || !ferrisInner || isUserClicking) return;
  
  const rect = ferrisSection.getBoundingClientRect();
  const scrolled = -rect.top;
  const total = ferrisSection.offsetHeight - window.innerHeight;

  if (scrolled > window.innerHeight * 0.25 && !hasSplit) {
    hasSplit = true;
    ferrisInner.classList.add('split');
    updateActiveStates(0);
  } else if (scrolled <= window.innerHeight * 0.15 && hasSplit) {
    hasSplit = false;
    ferrisInner.classList.remove('split');
    currentProject = -1;
  }

  if (hasSplit && total > 0) {
    const progress = Math.max(0, Math.min((scrolled - window.innerHeight * 0.25) / (total * 0.85), 1));
    targetRotation = progress * -360; 
    
    const idx = Math.min(Math.floor(progress * PROJECTS.length), PROJECTS.length - 1);
    updateActiveStates(idx);
  }
}, { passive: true });

// Continuous 60FPS Inertia Loop Pipeline
function renderSmoothLoop() {
  if (!isUserClicking && hasSplit) {
    // Clear out transition bottlenecks during active scroll loops
    wheelGroup.style.transition = 'none';
    currentRotation += (targetRotation - currentRotation) * easeFactor;
    
    wheelGroup.style.transform = `rotate(${currentRotation}deg)`;
    
    document.querySelectorAll('.gondola-outer').forEach(outer => {
      outer.style.transition = 'none';
      outer.style.transform = `rotate(${-currentRotation}deg)`;
    });
  }
  requestAnimationFrame(renderSmoothLoop);
}
requestAnimationFrame(renderSmoothLoop);

// Gondola click events
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

// ===== SMOOTH SCROLL FOR LINKS =====
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



// ===== BACK TO TOP — DROP TOWER =====
const btt = document.getElementById('backToTop');
if (btt) {
  window.addEventListener('scroll', () => {
    btt.classList.toggle('visible', window.scrollY > 500);
  });
  btt.addEventListener('click', () => {
    btt.classList.add('launching');
    setTimeout(() => btt.classList.remove('launching'), 700);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
