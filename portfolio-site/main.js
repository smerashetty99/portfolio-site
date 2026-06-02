// ===== CURSOR =====
const cursor = document.querySelector('.cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .gondola-group, .booth-card, .stub, .skill-pill').forEach(el => {
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
    const size = 1 + Math.random() * 3;
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${size}px;height:${size}px;animation-delay:${Math.random()*4}s;animation-duration:${2+Math.random()*3}s;`;
    container.appendChild(s);
  }
}
document.querySelectorAll('.hero-stars').forEach(c => makeStars(c, 100));

// ===== STRING LIGHTS =====
document.querySelectorAll('.string-lights').forEach(c => {
  for (let i = 0; i < 22; i++) {
    const b = document.createElement('div');
    b.className = 'bulb';
    b.style.animationDelay = (i * 0.12) + 's';
    c.appendChild(b);
  }
});

// ===== FADE UP =====
const fo = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fo.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => fo.observe(el));

// ===== PROJECTS DATA =====
const PROJECTS = [
  {
    num: 'Ride 01', emoji: '🎨',
    title: 'Brand & Visual Design',
    desc: 'Crafting cohesive visual identities and design systems — from moodboard to final delivery — that resonate with users and stand out in the market.',
    tags: ['Branding', 'Design Systems', 'Figma'],
    color: '#cbe6e6', link: '#'
  },
  {
    num: 'Ride 02', emoji: '📱',
    title: 'Mobile UX Research',
    desc: 'End-to-end user research from interview design to synthesis, uncovering insights that drive product decisions rooted in psychology.',
    tags: ['UX Research', 'Usability Testing', 'Personas'],
    color: '#f5c4b8', link: '#'
  },
  {
    num: 'Ride 03', emoji: '🖥️',
    title: 'Dashboard Redesign',
    desc: 'Transforming complex data interfaces into clear, intuitive dashboards that empower users to make faster, more confident decisions.',
    tags: ['Data Viz', 'Interaction Design', 'Prototyping'],
    color: '#f7e4b5', link: '#'
  },
  {
    num: 'Ride 04', emoji: '🛒',
    title: 'E-Commerce Flow',
    desc: 'Redesigning checkout experiences to reduce friction and increase conversion through behavioural psychology and A/B testing.',
    tags: ['E-Commerce', 'Conversion', 'A/B Testing'],
    color: '#d4e8d4', link: '#'
  },
  {
    num: 'Ride 05', emoji: '🤝',
    title: 'Accessibility Audit',
    desc: 'Comprehensive WCAG 2.1 audits and remediation plans — ensuring inclusive, delightful experiences for every user.',
    tags: ['Accessibility', 'WCAG', 'Inclusive Design'],
    color: '#e8d4f0', link: '#'
  },
];

// ===== FERRIS WHEEL SVG =====
// Gondola positions on a 250r circle, centre (260,270), angles from top: 90°, 162°, 234°, 306°, 18°
const CX = 260, CY = 270, R = 210;
const angles = [90, 162, 234, 306, 18]; // degrees from top (0° = right in math, but we offset)

function polarToCart(angleDeg, r) {
  const rad = ((angleDeg - 90) * Math.PI) / 180; // -90 so 0deg = top
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function buildFerrisWheel() {
  const svg = document.getElementById('ferris-svg');
  if (!svg) return;

  const wheelGroup = document.getElementById('fw-wheel');

  // spokes
  angles.forEach((a, i) => {
    const pos = polarToCart(a, R);
    const line = document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1', CX); line.setAttribute('y1', CY);
    line.setAttribute('x2', pos.x); line.setAttribute('y2', pos.y);
    line.setAttribute('stroke', 'rgba(142,197,197,0.6)');
    line.setAttribute('stroke-width', '2');
    wheelGroup.appendChild(line);
  });

  // inner decorative ring
  const innerRing = document.createElementNS('http://www.w3.org/2000/svg','circle');
  innerRing.setAttribute('cx',CX); innerRing.setAttribute('cy',CY); innerRing.setAttribute('r','60');
  innerRing.setAttribute('fill','none'); innerRing.setAttribute('stroke','rgba(142,197,197,0.25)'); innerRing.setAttribute('stroke-width','1.5');
  wheelGroup.appendChild(innerRing);

  // gondolas
  angles.forEach((a, i) => {
    const pos = polarToCart(a, R);
    const p = PROJECTS[i];
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('class','gondola-group');
    g.setAttribute('data-index', i);
    g.style.transformOrigin = `${pos.x}px ${pos.y}px`;

    // hanging cord
    const cord = document.createElementNS('http://www.w3.org/2000/svg','line');
    cord.setAttribute('x1',pos.x); cord.setAttribute('y1',pos.y);
    cord.setAttribute('x2',pos.x); cord.setAttribute('y2',pos.y+18);
    cord.setAttribute('stroke','rgba(142,197,197,0.5)'); cord.setAttribute('stroke-width','1.5');
    g.appendChild(cord);

    // cart background
    const rect = document.createElementNS('http://www.w3.org/2000/svg','rect');
    rect.setAttribute('class','gondola-rect');
    rect.setAttribute('x', pos.x - 28); rect.setAttribute('y', pos.y + 18);
    rect.setAttribute('width','56'); rect.setAttribute('height','44'); rect.setAttribute('rx','10');
    rect.setAttribute('fill', p.color); rect.setAttribute('stroke', 'rgba(39,128,103,0.4)');
    rect.setAttribute('stroke-width','2');
    g.appendChild(rect);

    // emoji
    const txt = document.createElementNS('http://www.w3.org/2000/svg','text');
    txt.setAttribute('x', pos.x); txt.setAttribute('y', pos.y + 46);
    txt.setAttribute('text-anchor','middle'); txt.setAttribute('font-size','20');
    txt.textContent = p.emoji;
    g.appendChild(txt);

    // project num label
    const label = document.createElementNS('http://www.w3.org/2000/svg','text');
    label.setAttribute('x', pos.x); label.setAttribute('y', pos.y + 60);
    label.setAttribute('text-anchor','middle'); label.setAttribute('font-size','7');
    label.setAttribute('font-family','DM Mono, monospace');
    label.setAttribute('fill','rgba(30,58,58,0.7)');
    label.textContent = String(i+1).padStart(2,'0');
    g.appendChild(label);

    wheelGroup.appendChild(g);
  });
}
buildFerrisWheel();

// ===== FERRIS WHEEL ROTATION + SCROLL LOGIC =====
const ferrisSection = document.getElementById('ferris-section');
const ferrisInner   = document.querySelector('.ferris-inner');
const ferrisHint    = document.querySelector('.ferris-hint');
const wheelGroup    = document.getElementById('fw-wheel');
const previewCard   = document.querySelector('.preview-card');

let currentProject = -1;
let wheelAngle = 0;
const degreesPerProject = 360 / PROJECTS.length; // 72°

function goToProject(index) {
  if (index === currentProject) return;
  currentProject = index;

  // rotate wheel so selected gondola is at bottom (index 0 starts at top, bottom = +180 from top)
  // initial angle of gondola[i]: angles[i] - 90 (our polar offset)
  // we want it at bottom (270° in standard, or +180 from top)
  // target rotation = (180 - angles[index] + 90) mod 360 — simplified:
  const startAngle = angles[index]; // 0=top convention
  const targetAngle = -(startAngle - 90); // bring it to bottom-ish visible
  wheelAngle = targetAngle;
  wheelGroup.style.transition = 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)';
  wheelGroup.style.transform = `rotate(${wheelAngle}deg)`;

  // update active gondola
  document.querySelectorAll('.gondola-group').forEach((g, i) => {
    g.classList.toggle('active', i === index);
  });

  // update preview
  updatePreview(index);
}

function updatePreview(index) {
  if (!previewCard) return;
  const p = PROJECTS[index];
  previewCard.classList.remove('visible');
  setTimeout(() => {
    previewCard.querySelector('.preview-num').textContent   = p.num;
    previewCard.querySelector('.preview-title').textContent = p.title;
    previewCard.querySelector('.preview-desc').textContent  = p.desc;
    previewCard.querySelector('.preview-img').style.background = p.color;
    previewCard.querySelector('.preview-img').querySelector('.preview-emoji').textContent = p.emoji;
    const tagsEl = previewCard.querySelector('.preview-tags');
    tagsEl.innerHTML = p.tags.map(t=>`<span class="preview-tag">${t}</span>`).join('');
    previewCard.querySelector('.btn-view').href = p.link;
    previewCard.classList.add('visible');
  }, 120);
}

// Build initial preview card content
if (previewCard) {
  previewCard.innerHTML = `
    <div class="preview-card-inner">
      <div class="preview-img" style="background:${PROJECTS[0].color}">
        <span class="preview-emoji" style="font-size:5rem">${PROJECTS[0].emoji}</span>
      </div>
      <div class="preview-body">
        <div class="preview-num">${PROJECTS[0].num}</div>
        <h3 class="preview-title">${PROJECTS[0].title}</h3>
        <p class="preview-desc">${PROJECTS[0].desc}</p>
        <div class="preview-tags">${PROJECTS[0].tags.map(t=>`<span class="preview-tag">${t}</span>`).join('')}</div>
        <a href="${PROJECTS[0].link}" class="btn-view">View project →</a>
      </div>
    </div>`;
}

// Scroll watcher
let hasSplit = false;

window.addEventListener('scroll', () => {
  if (!ferrisSection || !ferrisInner) return;
  const rect = ferrisSection.getBoundingClientRect();
  const total = ferrisSection.offsetHeight - window.innerHeight;
  const scrolled = -rect.top;

  // Trigger split after scrolling 1 viewport into section
  if (scrolled > window.innerHeight * 0.3 && !hasSplit) {
    hasSplit = true;
    ferrisInner.classList.add('split');
    setTimeout(() => goToProject(0), 200);
  } else if (scrolled <= window.innerHeight * 0.2 && hasSplit) {
    hasSplit = false;
    ferrisInner.classList.remove('split');
    currentProject = -1;
  }

  // After split, map scroll to project
  if (hasSplit && scrolled > 0) {
    const progress = Math.min((scrolled - window.innerHeight * 0.3) / (total - window.innerHeight * 0.3), 1);
    const idx = Math.min(Math.floor(progress * PROJECTS.length), PROJECTS.length - 1);
    goToProject(idx);
  }
});

// Gondola click
document.addEventListener('click', e => {
  const g = e.target.closest('.gondola-group');
  if (!g) return;
  const idx = parseInt(g.dataset.index);
  if (!hasSplit) {
    // force split first
    hasSplit = true;
    ferrisInner.classList.add('split');
    setTimeout(() => goToProject(idx), 200);
  } else {
    goToProject(idx);
  }
  // If the project has a real link, navigate on second click
  if (PROJECTS[idx].link !== '#') window.location.href = PROJECTS[idx].link;
});

// ===== MIDWAY DRAG SCROLL =====
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
