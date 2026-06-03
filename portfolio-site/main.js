// ===== STAR CURSOR =====
const cursor = document.querySelector('.cursor');
if (cursor) {
  cursor.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
      fill="#BCD8EC" stroke="#2a6090" stroke-width="1" stroke-linejoin="round"/>
  </svg>`;
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .gondola-group, .booth-card, .stub, .skill-pill, .art-card, .marketing-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ===== SCROLL PROGRESS =====
const bar = document.querySelector('.scroll-progress');
if (bar) window.addEventListener('scroll', () => {
  bar.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%';
});

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

// ===== HERO TEXT ANIMATION =====
const h1 = document.querySelector('.gate h1');
if (h1) {
  const html = h1.innerHTML;
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
  const nodes = [...doc.querySelector('div').childNodes];
  h1.innerHTML = '';
  let delay = 0.1;
  nodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const words = node.textContent.split(' ').filter(w => w.trim());
      words.forEach((w, i) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = w + ' ';
        span.style.animationDelay = delay + 's';
        h1.appendChild(span);
        delay += 0.12;
      });
    } else if (node.nodeName === 'EM') {
      const words = node.textContent.split(' ').filter(w => w.trim());
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

// ===== PROJECTS DATA (from resume) =====
const PROJECTS = [
  {
    num: 'Case Study 01', emoji: '🌾',
    title: 'Kisan4U',
    desc: 'Designed an accessible e-commerce platform for farmers and suppliers in a fast-paced startup environment. Focused on low-literacy users, strengthening CTAs and simplifying navigation through user research and usability testing.',
    tags: ['E-Commerce UX', 'Accessibility', 'User Research', 'Figma'],
    color: '#D6E5BD',
    link: 'https://smerashetty.com'
  },
  {
    num: 'Case Study 02', emoji: '🦆',
    title: 'GooseConnect',
    desc: 'Designed a prototype app to help University of Waterloo students build communities. Conducted user research, developed customer profiles, mapped user journeys, and built an intuitive Figma prototype to remove social barriers.',
    tags: ['App Design', 'UX Research', 'Prototyping', 'Community'],
    color: '#BCD8EC',
    link: 'https://smerashetty.com'
  },
  {
    num: 'Case Study 03', emoji: '🏛️',
    title: 'Ontario Exposure Registry',
    desc: 'Contributed to UX research and design for a public-facing government service at the Ontario Ministry of Transportation. Conducted interviews, usability testing, synthesized findings into personas and journey maps.',
    tags: ['Government UX', 'Accessibility', 'Research', 'Agile'],
    color: '#DCCCE8',
    link: '#'
  },
  {
    num: 'Case Study 04', emoji: '🕊️',
    title: 'Peace for All Canada',
    desc: 'Designed and scheduled social media content, created promotional materials including posters, reels, and stories. Assisted in content planning and strategy for community outreach campaigns.',
    tags: ['Design', 'Social Media', 'Branding', 'Non-profit'],
    color: '#FFCBE1',
    link: '#'
  },
];

// ===== FERRIS WHEEL =====
const CX = 270, CY = 270, R = 210;
const GONDOLA_W = 72, GONDOLA_H = 52;
const angles = [90, 162, 234, 306, 18, 90]; // 4 projects only using first 4 slots; 5th angle unused

function polar(deg, r) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function buildFerris() {
  const svg = document.getElementById('ferris-svg');
  const wg  = document.getElementById('fw-wheel');
  if (!svg || !wg) return;

  const projectAngles = [90, 162, 234, 306]; // 4 projects

  projectAngles.forEach((a, i) => {
    const pos = polar(a, R);
    const p = PROJECTS[i];

    // spoke
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', CX); line.setAttribute('y1', CY);
    line.setAttribute('x2', pos.x); line.setAttribute('y2', pos.y);
    line.setAttribute('stroke', 'rgba(188,216,236,0.5)');
    line.setAttribute('stroke-width', '2');
    wg.appendChild(line);

    // gondola group — transform-origin at connection point
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('class','gondola-group');
    g.setAttribute('data-index', i);

    // set transform-origin for sway at top of gondola
    const connectX = pos.x, connectY = pos.y + 2;

    // hanging cord
    const cord = document.createElementNS('http://www.w3.org/2000/svg','line');
    cord.setAttribute('x1', pos.x); cord.setAttribute('y1', pos.y);
    cord.setAttribute('x2', pos.x); cord.setAttribute('y2', pos.y + 18);
    cord.setAttribute('stroke','rgba(188,216,236,.55)'); cord.setAttribute('stroke-width','2');
    g.appendChild(cord);

    // cart
    const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('class','gondola-rect');
    rect.setAttribute('x', pos.x - GONDOLA_W/2);
    rect.setAttribute('y', pos.y + 18);
    rect.setAttribute('width', GONDOLA_W);
    rect.setAttribute('height', GONDOLA_H);
    rect.setAttribute('rx','12');
    rect.setAttribute('fill', p.color);
    rect.setAttribute('stroke','rgba(42,96,144,0.35)');
    rect.setAttribute('stroke-width','2');
    g.appendChild(rect);

    // emoji
    const emoji = document.createElementNS('http://www.w3.org/2000/svg','text');
    emoji.setAttribute('x', pos.x); emoji.setAttribute('y', pos.y + 50);
    emoji.setAttribute('text-anchor','middle'); emoji.setAttribute('font-size','24');
    emoji.textContent = p.emoji;
    g.appendChild(emoji);

    // label
    const lbl = document.createElementNS('http://www.w3.org/2000/svg','text');
    lbl.setAttribute('x', pos.x); lbl.setAttribute('y', pos.y + 66);
    lbl.setAttribute('text-anchor','middle'); lbl.setAttribute('font-size','9');
    lbl.setAttribute('font-family','DM Mono, monospace'); lbl.setAttribute('fill','rgba(29,63,94,0.65)');
    lbl.textContent = String(i+1).padStart(2,'0');
    g.appendChild(lbl);

    // store sway origin as data attrs for JS
    g.dataset.cx = connectX; g.dataset.cy = connectY;

    wg.appendChild(g);
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
const projectAngles = [90, 162, 234, 306];

function swayGondolas() {
  document.querySelectorAll('.gondola-group').forEach(g => {
    g.classList.remove('gondola-sway');
    void g.offsetWidth; // reflow to restart
    g.classList.add('gondola-sway');
    setTimeout(() => g.classList.remove('gondola-sway'), 1500);
  });
}

function goToProject(index) {
  if (index === currentProject) return;
  currentProject = index;

  // Rotate wheel so selected gondola comes forward (toward right center)
  const angle = projectAngles[index];
  // We want angle to map to "right" (0° in our top-origin system = 270° standard)
  const rotation = -(angle - 270);
  wheelGroup.style.transition = 'transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94)';
  wheelGroup.style.transform = `rotate(${rotation}deg)`;

  setTimeout(swayGondolas, 900);

  document.querySelectorAll('.gondola-group').forEach((g, i) => {
    g.classList.toggle('active', i === index);
  });

  updatePreview(index);
}

function buildPreviewHTML(p) {
  return `
    <div class="preview-card-inner">
      <div class="preview-img" style="background:${p.color}">
        <span style="font-size:5.5rem">${p.emoji}</span>
      </div>
      <div class="preview-body">
        <div class="preview-num">${p.num}</div>
        <h3 class="preview-title">${p.title}</h3>
        <p class="preview-desc">${p.desc}</p>
        <div class="preview-tags">${p.tags.map(t=>`<span class="preview-tag">${t}</span>`).join('')}</div>
        <a href="${p.link}" class="btn-view" target="${p.link !== '#' ? '_blank' : '_self'}">View case study →</a>
      </div>
    </div>`;
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

// ===== ART CAROUSEL DRAG =====
const artTrack = document.querySelector('.art-carousel-track');
if (artTrack) {
  let down = false, startX, scrollLeft;
  const wrap = artTrack.parentElement;
  wrap.addEventListener('mousedown', e => { down=true; startX=e.pageX; scrollLeft=artTrack.scrollLeft||0; });
  wrap.addEventListener('mouseup', () => down=false);
  wrap.addEventListener('mouseleave', () => down=false);
}

// ===== MIDWAY DRAG =====
const track = document.querySelector('.midway-track');
if (track) {
  let down=false, startX, sl;
  track.addEventListener('mousedown', e=>{down=true;startX=e.pageX-track.offsetLeft;sl=track.scrollLeft;});
  track.addEventListener('mouseleave',()=>down=false);
  track.addEventListener('mouseup',()=>down=false);
  track.addEventListener('mousemove',e=>{if(!down)return;e.preventDefault();track.scrollLeft=sl-(e.pageX-track.offsetLeft-startX)*1.5;});
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}
  });
});
