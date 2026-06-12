// ===== WCAG: only hide cursor for mouse users =====
document.body.classList.add('using-mouse');
document.addEventListener('keydown', () => document.body.classList.remove('using-mouse'));
document.addEventListener('mousedown', () => document.body.classList.add('using-mouse'));

// ===== 4-POINT STAR CURSOR =====
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
  }, { passive: true });
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

// ===== HERO TEXT — words revealed in star's wake =====
const h1 = document.querySelector('.gate h1');
if (h1) {
  const rawHTML = h1.innerHTML;
  const parser = new DOMParser();
  const doc = parser.parseFromString('<div>' + rawHTML + '</div>', 'text/html');
  const nodes = [...doc.querySelector('div').childNodes];
  h1.innerHTML = '';
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
  window._heroWordSpans = wordSpans;
}

// ===== STRING LIGHTS =====
document.querySelectorAll('.string-lights').forEach(c => {
  for (let i = 0; i < 24; i++) {
    const b = document.createElement('div');
    b.className = 'bulb';
    c.appendChild(b);
  }
});

// ===== FADE UP =====
const fo = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fo.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-up').forEach(el => fo.observe(el));

// ===== PROJECTS DATA — reordered: OER, Kisan4U, Willie's, GooseConnect =====
const PROJECTS = [
  {
    num: 'Case Study 01', emoji: '🏛️',
    title: 'Ontario Exposure Registry',
    shortLabel: 'Ontario MTO',
    desc: 'AI-assisted usability research for a government self-tracker at Ontario MTO. Led 3 sessions, produced AI vs. manual time study (~70% efficiency gain), synthesized recommendations for the live platform.',
    tags: ['Government UX', 'Usability Testing', 'AI Research', 'Accessibility'],
    color: '#DCCCE8',
    link: 'mto.html',
    device: 'laptop',
    thumb: 'thumb-mto-live.webp'
  },
  {
    num: 'Case Study 02', emoji: '🌾',
    title: 'Kisan4U',
    shortLabel: 'Kisan4U',
    desc: 'Redesigned an agricultural e-commerce platform for low-literacy farmers in a fast-paced startup. Strengthened CTAs, simplified navigation, and improved trust signals through user research and usability testing.',
    tags: ['E-Commerce UX', 'Accessibility', 'User Research', 'Figma'],
    color: '#D6E5BD',
    link: 'kisan4u.html',
    device: 'laptop',
    thumb: 'kisan4u-page.webp'
  },
  {
    num: 'Case Study 03', emoji: '🍫',
    title: "Willie's Chocolates",
    shortLabel: "Willie's",
    desc: 'Designed a magical, nostalgic digital experience for a reimagined Wonka-style chocolate brand — live on the web. Brand storytelling, immersive UX, and a full e-commerce flow.',
    tags: ['Brand UX', 'Visual Design', 'E-Commerce', 'Live Site'],
    color: '#FFCBE1',
    link: 'willies.html',
    device: 'laptop',
    thumb: 'thumb-willies-2.webp'
  },
  {
    num: 'Case Study 04', emoji: '🦆',
    title: 'GooseConnect',
    shortLabel: 'GooseConnect',
    desc: 'Designed a campus connection platform for University of Waterloo students. Led team research, journey mapping, and Figma prototyping to reduce social barriers and foster genuine friendships.',
    tags: ['App Design', 'UX Research', 'Prototyping', 'Community'],
    color: '#BCD8EC',
    link: 'gooseconnect.html',
    device: 'phone',
    screens: ['goose-home.webp', 'goose-search.webp', 'goose-profile.webp', 'goose-account.webp']
  },
];

// ===== FERRIS WHEEL =====
const CX = 270, CY = 270, R = 210;
const GONDOLA_W = 113, GONDOLA_H = 82;
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
    const attachX = pos.x, attachY = pos.y;
    const cartTop = attachY + 20;
    const cartCY  = cartTop + GONDOLA_H / 2; // vertical centre of cart

    // spoke
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', CX); line.setAttribute('y1', CY);
    line.setAttribute('x2', attachX); line.setAttribute('y2', attachY);
    line.setAttribute('stroke','rgba(188,216,236,0.5)');
    line.setAttribute('stroke-width','2.5');
    wg.appendChild(line);

    // outer group (counter-rotation for gravity)
    const outer = document.createElementNS('http://www.w3.org/2000/svg','g');
    outer.setAttribute('class','gondola-outer');
    outer.setAttribute('data-index', i);
    outer.dataset.cx = attachX; outer.dataset.cy = attachY;
    outer.style.transformBox = 'view-box';
    outer.style.transformOrigin = attachX + 'px ' + attachY + 'px';

    // inner group (sway + interaction)
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('class','gondola-group');
    g.setAttribute('data-index', i);
    g.setAttribute('role','button');
    g.setAttribute('tabindex','0');
    g.setAttribute('aria-label', 'View ' + p.title + ' case study');

    // cord
    const cord = document.createElementNS('http://www.w3.org/2000/svg','line');
    cord.setAttribute('x1',attachX); cord.setAttribute('y1',attachY);
    cord.setAttribute('x2',attachX); cord.setAttribute('y2',cartTop);
    cord.setAttribute('stroke','rgba(188,216,236,.65)'); cord.setAttribute('stroke-width','2');
    g.appendChild(cord);

    // cart background rect
    const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('class','gondola-rect');
    rect.setAttribute('x', attachX - GONDOLA_W/2);
    rect.setAttribute('y', cartTop);
    rect.setAttribute('width', GONDOLA_W);
    rect.setAttribute('height', GONDOLA_H);
    rect.setAttribute('rx','14');
    rect.setAttribute('fill', p.color);
    rect.setAttribute('stroke','rgba(42,96,144,0.35)');
    rect.setAttribute('stroke-width','2');
    g.appendChild(rect);

    // Large centred emoji logo
    const emojiEl = document.createElementNS('http://www.w3.org/2000/svg','text');
    emojiEl.setAttribute('x', attachX);
    emojiEl.setAttribute('y', cartCY + 2);   // slightly below centre, visual balance
    emojiEl.setAttribute('text-anchor','middle');
    emojiEl.setAttribute('dominant-baseline','middle');
    emojiEl.setAttribute('font-size','42');
    emojiEl.textContent = p.emoji;
    g.appendChild(emojiEl);

    // Short project name label below emoji
    const label = document.createElementNS('http://www.w3.org/2000/svg','text');
    label.setAttribute('x', attachX);
    label.setAttribute('y', cartTop + GONDOLA_H - 10);
    label.setAttribute('text-anchor','middle');
    label.setAttribute('dominant-baseline','auto');
    label.setAttribute('font-size','9');
    label.setAttribute('font-family','DM Sans, sans-serif');
    label.setAttribute('font-weight','700');
    label.setAttribute('fill','rgba(29,63,94,0.7)');
    label.textContent = p.shortLabel;
    g.appendChild(label);

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

let currentProject = -1, hasSplit = false, currentRotation = 0;

function applyGondolaCounterRotation(rotation) {
  document.querySelectorAll('.gondola-outer').forEach(outer => {
    const cx = parseFloat(outer.dataset.cx), cy = parseFloat(outer.dataset.cy);
    outer.style.transformBox = 'view-box';
    outer.style.transformOrigin = cx + 'px ' + cy + 'px';
    outer.style.transition = 'transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94)';
    outer.style.transform = 'rotate(' + (-rotation) + 'deg)';
  });
}

function swayGondolas() {
  document.querySelectorAll('.gondola-group').forEach(g => {
    g.classList.remove('gondola-sway'); void g.offsetWidth;
    g.classList.add('gondola-sway');
    setTimeout(() => g.classList.remove('gondola-sway'), 2200);
  });
}

const CURSOR_SVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2 L13.8 10.2 L22 12 L13.8 13.8 L12 22 L10.2 13.8 L2 12 L10.2 10.2 Z"
    fill="#BCD8EC" stroke="#2a6090" stroke-width="1.2" stroke-linejoin="round"/></svg>`;

function buildDeviceHTML(p) {
  if (p.device === 'phone' && p.screens) {
    const imgs = p.screens.map((s, i) =>
      `<img src="${s}" alt="${p.title} app screen ${i+1}" loading="lazy" style="animation-delay:${i*4}s"/>`
    ).join('');
    return `<div class="device-phone"><div class="device-screen">${imgs}</div></div>`;
  }
  if (p.thumb) {
    return `<div class="device-browser">
      <div class="device-browser-bar"><span></span><span></span><span></span></div>
      <div class="device-screen">
        <img src="${p.thumb}" alt="${p.title} website screenshot" loading="lazy"/>
        <div class="preview-cursor" aria-hidden="true">${CURSOR_SVG}</div>
      </div>
    </div>`;
  }
  return `<span class="preview-emoji-fallback" style="font-size:6rem">${p.emoji}</span>`;
}

function buildPreviewHTML(p) {
  return `<div class="preview-card-inner">
    <div class="preview-stage" style="background:${p.color}">
      ${buildDeviceHTML(p)}
    </div>
    <div class="preview-body">
      <div class="preview-num">${p.num}</div>
      <h3 class="preview-title">${p.title}</h3>
      <p class="preview-desc">${p.desc}</p>
      <div class="preview-tags">${p.tags.map(t=>`<span class="preview-tag">${t}</span>`).join('')}</div>
      <a href="${p.link}" class="btn-view">View case study →</a>
    </div>
  </div>`;
}

function goToProject(index) {
  if (index === currentProject) return;
  currentProject = index;
  const rotation = -(projectAngles[index] - 90);
  currentRotation = rotation;
  wheelGroup.style.transition = 'transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94)';
  wheelGroup.style.transform = 'rotate(' + rotation + 'deg)';
  applyGondolaCounterRotation(rotation);
  setTimeout(swayGondolas, 900);
  document.querySelectorAll('.gondola-outer').forEach((o,i) => o.classList.toggle('active-outer', i===index));
  document.querySelectorAll('.gondola-group').forEach((g,i) => g.classList.toggle('active', i===index));
  updatePreview(index);
}

if (previewCard) previewCard.innerHTML = buildPreviewHTML(PROJECTS[0]);

function updatePreview(index) {
  if (!previewCard) return;
  previewCard.classList.remove('visible');
  setTimeout(() => { previewCard.innerHTML = buildPreviewHTML(PROJECTS[index]); previewCard.classList.add('visible'); }, 130);
}

window.addEventListener('scroll', () => {
  if (!ferrisSection || !ferrisInner) return;
  const rect = ferrisSection.getBoundingClientRect();
  const scrolled = -rect.top;
  const total = ferrisSection.offsetHeight - window.innerHeight;
  if (scrolled > window.innerHeight * 0.25 && !hasSplit) {
    hasSplit = true; ferrisInner.classList.add('split');
    setTimeout(() => goToProject(0), 250);
  } else if (scrolled <= window.innerHeight * 0.15 && hasSplit) {
    hasSplit = false; ferrisInner.classList.remove('split'); currentProject = -1;
  }
  if (hasSplit && total > 0) {
    const progress = Math.max(0, Math.min((scrolled - window.innerHeight*0.25)/(total*0.85),1));
    goToProject(Math.min(Math.floor(progress * PROJECTS.length), PROJECTS.length-1));
  }
}, { passive: true });

document.getElementById('ferris-svg')?.addEventListener('click', e => {
  const g = e.target.closest('.gondola-group');
  if (!g) return;
  const idx = parseInt(g.dataset.index);
  if (!hasSplit) { hasSplit=true; ferrisInner.classList.add('split'); setTimeout(()=>goToProject(idx),250); }
  else goToProject(idx);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 60, behavior:'smooth' }); }
  });
});

// ===== BACK TO TOP + SCROLL-DRIVEN CHAIR =====
const btt = document.getElementById('backToTop');
const bttCarGroup = document.querySelector('.btt-car-group');
if (btt) {
  function updateBtt() {
    const scrollY = window.scrollY;
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    btt.classList.toggle('visible', scrollY > 400);
    if (bttCarGroup && scrollMax > 0) {
      const progress = Math.min(scrollY / scrollMax, 1);
      const yOffset = -20 + progress * 48;
      bttCarGroup.setAttribute('transform','translate(0,' + yOffset + ')');
    }
  }
  window.addEventListener('scroll', updateBtt, { passive: true });
  updateBtt();
  btt.addEventListener('click', () => {
    btt.classList.add('launching');
    setTimeout(() => btt.classList.remove('launching'), 800);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== NAV STAR → SHOOTING STAR → RETURNS FROM LEFT =====
function runNavStarAnimation() {
  const navStar = document.querySelector('.nav-star');
  if (!navStar) return;
  const navRect = navStar.getBoundingClientRect();
  const startX  = navRect.left + navRect.width  / 2;
  const startY  = navRect.top  + navRect.height / 2;
  const h1El    = document.querySelector('.gate h1');
  const heroY   = h1El ? h1El.getBoundingClientRect().top + h1El.getBoundingClientRect().height/2 : startY;

  const flyer = document.createElement('div');
  flyer.id = 'nav-star-flyer';
  flyer.setAttribute('aria-hidden','true');
  flyer.innerHTML = '<span class="flyer-beam"></span><span class="flyer-star">✦</span>';
  document.body.appendChild(flyer);
  const beam = flyer.querySelector('.flyer-beam');

  // Timing (ms) — shoot is 50% slower than before
  const GLOW_IN  = 320;
  const SHOOT    = 2220;   // 50% slower (was 1480)
  const PAUSE    = 120;
  const RETURN   = 1200;   // sweep back from left
  const GLOW_OUT = 700;

  // Word reveal: spread across the shoot phase
  const spans = window._heroWordSpans || [];
  spans.forEach((span, i) => {
    span.style.animationDelay = (GLOW_IN/1000 + 0.08 + i * 0.17) + 's';
  });

  navStar.style.opacity = '0';
  let t0 = null;

  function tick(ts) {
    if (!t0) t0 = ts;
    const ms = ts - t0;

    if (ms < GLOW_IN) {
      // Phase 1: glow at nav
      const p = ms / GLOW_IN;
      flyer.style.cssText = 'left:'+startX+'px;top:'+startY+'px;opacity:'+Math.min(p*2,1)+';';
      beam.style.width = '0px';
      beam.style.transform = '';

    } else if (ms < GLOW_IN + SHOOT) {
      // Phase 2: shoot RIGHT across hero (slower)
      const p  = (ms - GLOW_IN) / SHOOT;
      const ep = 1 - Math.pow(1 - p, 2.5); // ease out
      const x  = startX + ep * (window.innerWidth + 220);
      const dy = heroY - startY;
      const y  = startY + dy * Math.min(p * 4, 1);
      const op = p < 0.88 ? 1 : Math.max(0, 1 - (p - 0.88) / 0.12);
      flyer.style.cssText = 'left:'+x+'px;top:'+y+'px;opacity:'+op+';';
      beam.style.width = Math.min(p * 5, 1) * 160 + 'px';
      beam.style.transform = '';

    } else if (ms < GLOW_IN + SHOOT + PAUSE) {
      // Brief invisible pause
      flyer.style.opacity = '0';

    } else if (ms < GLOW_IN + SHOOT + PAUSE + RETURN) {
      // Phase 3: re-enter from LEFT, sweep back to nav
      const p  = (ms - GLOW_IN - SHOOT - PAUSE) / RETURN;
      const ep = 1 - Math.pow(1 - p, 2); // ease out
      // Start: just left of left edge at heroY, end: nav position
      const x0 = -180, y0 = heroY;
      const x  = x0 + ep * (startX - x0);
      const y  = y0 + ep * (startY - y0);
      const op = p < 0.08 ? p / 0.08 : (p > 0.85 ? Math.max(0, 1-(p-0.85)/0.15) : 1);
      flyer.style.cssText = 'left:'+x+'px;top:'+y+'px;opacity:'+op+';';
      // Beam points LEFT (reversed) since star moves right-to-left direction
      beam.style.width = Math.min((1-p) * 3, 1) * 130 + 'px';
      beam.style.transform = 'scaleX(-1)';

    } else {
      // Phase 4: nav star glows back
      flyer.remove();
      navStar.style.opacity = '1';
      navStar.classList.add('glowing');
      setTimeout(() => navStar.classList.remove('glowing'), GLOW_OUT);
      return;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

setTimeout(runNavStarAnimation, 80);

// ===== MOBILE HAMBURGER NAV (injected on every page) =====
(function () {
  const nav = document.querySelector('nav');
  const links = document.querySelector('.nav-links');
  if (!nav || !links) return;
  const btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Toggle navigation menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(btn);
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
    })
  );
})();

// ===== MOBILE PROJECT LIST (replaces ferris wheel on small screens) =====
(function () {
  const header = document.querySelector('.projects-header');
  if (!header || typeof PROJECTS === 'undefined') return;
  const list = document.createElement('div');
  list.className = 'projects-mobile';
  list.innerHTML = PROJECTS.map(p =>
    `<div class="preview-card">${buildPreviewHTML(p)}</div>`
  ).join('');
  header.insertAdjacentElement('afterend', list);
  // Update hint text on mobile
  const mq = window.matchMedia('(max-width: 900px)');
  const hint = header.querySelector('p');
  function applyHint() {
    if (hint) hint.textContent = mq.matches
      ? 'Four projects — tap any to jump in.'
      : 'Scroll to spin the wheel — or click any cart to jump in.';
  }
  applyHint();
  mq.addEventListener ? mq.addEventListener('change', applyHint) : mq.addListener(applyHint);
})();

// ===== CASE STUDY TOC SCROLLSPY =====
(function () {
  const toc = document.querySelector('.cs-toc');
  if (!toc) return;
  const tocLinks = [...toc.querySelectorAll('a')];
  const sections = tocLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        tocLinks.forEach(a => a.classList.toggle('active',
          a.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(s => spy.observe(s));
})();
