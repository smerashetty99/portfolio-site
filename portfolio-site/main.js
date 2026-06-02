// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .booth-card, .project-card, .stub').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ===== SCROLL PROGRESS BAR =====
const progressBar = document.querySelector('.scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    progressBar.style.width = progress + '%';
  });
}

// ===== GENERATE STARS =====
function generateStars(container, count) {
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (2 + Math.random() * 3) + 's';
    container.appendChild(star);
  }
}
generateStars(document.querySelector('.hero-stars'), 80);
generateStars(document.querySelector('.footer-stars'), 40);

// ===== GENERATE STRING LIGHTS =====
function generateLights(container, count) {
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const bulb = document.createElement('div');
    bulb.className = 'bulb';
    bulb.style.animationDelay = (i * 0.15) + 's';
    container.appendChild(bulb);
  }
}
generateLights(document.querySelector('.string-lights'), 20);

// ===== FADE UP OBSERVER =====
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// ===== FERRIS WHEEL SCROLL ANIMATION =====
const projects = [
  {
    num: 'Ride #01',
    emoji: '🎨',
    title: 'Brand & Visual Design',
    desc: 'Crafting cohesive visual identities and design systems that resonate with users and stand out in the market.',
    tags: ['Branding', 'Design Systems', 'Figma'],
    color: 'linear-gradient(135deg, #278067, #1A2E26)',
    link: '#'
  },
  {
    num: 'Ride #02',
    emoji: '📱',
    title: 'Mobile UX Research',
    desc: 'End-to-end user research, from interview design to synthesis, uncovering insights that drive product decisions.',
    tags: ['UX Research', 'Usability Testing', 'Personas'],
    color: 'linear-gradient(135deg, #E8523A, #c23a24)',
    link: '#'
  },
  {
    num: 'Ride #03',
    emoji: '🖥️',
    title: 'Dashboard Redesign',
    desc: 'Transforming complex data interfaces into clear, intuitive dashboards that empower users to make faster decisions.',
    tags: ['Data Viz', 'Interaction Design', 'Prototyping'],
    color: 'linear-gradient(135deg, #F5C842, #c8971a)',
    link: '#'
  },
  {
    num: 'Ride #04',
    emoji: '🛒',
    title: 'E-Commerce Flow',
    desc: 'Redesigning checkout experiences to reduce friction and increase conversion through behavioural psychology principles.',
    tags: ['E-Commerce', 'Conversion', 'A/B Testing'],
    color: 'linear-gradient(135deg, #5b6ef5, #3a4ecc)',
    link: '#'
  },
  {
    num: 'Ride #05',
    emoji: '🤝',
    title: 'Accessibility Audit',
    desc: 'Comprehensive WCAG 2.1 audits and remediation plans ensuring inclusive experiences for all users.',
    tags: ['Accessibility', 'WCAG', 'Inclusive Design'],
    color: 'linear-gradient(135deg, #278067, #5bb89a)',
    link: '#'
  }
];

// Build project cards
const projectsArea = document.querySelector('.projects-scroll-area');
if (projectsArea) {
  projects.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card' + (i === 0 ? ' active' : '');
    card.dataset.index = i;
    card.innerHTML = `
      <div class="project-card-inner">
        <div class="project-preview" style="background:${p.color}">
          <span style="font-size:5rem;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.3))">${p.emoji}</span>
        </div>
        <div class="project-body">
          <div class="project-num">${p.num}</div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.desc}</p>
          <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
          <a href="${p.link}" class="btn-board">Board this ride →</a>
        </div>
      </div>
    `;
    projectsArea.appendChild(card);
  });
}

// Scroll-driven ferris wheel rotation
const ferrisSection = document.getElementById('ferris-section');
const ferrisWheelGroup = document.getElementById('ferris-wheel-group');
const ferrisScrollStops = document.querySelectorAll('.ferris-scroll-stop');
let currentProject = 0;

function updateProject(index) {
  if (index === currentProject) return;
  currentProject = index;
  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
  // Rotate wheel: each project = 72 degrees (360/5)
  if (ferrisWheelGroup) {
    const angle = index * (360 / projects.length);
    ferrisWheelGroup.style.transform = `rotate(${angle}deg)`;
  }
}

// Watch scroll position within ferris section
if (ferrisSection) {
  window.addEventListener('scroll', () => {
    const rect = ferrisSection.getBoundingClientRect();
    const totalHeight = ferrisSection.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    if (scrolled < 0 || scrolled > totalHeight) return;
    const progress = scrolled / totalHeight;
    const projectIndex = Math.min(
      Math.floor(progress * projects.length),
      projects.length - 1
    );
    updateProject(projectIndex);
  });
}

// ===== HORIZONTAL DRAG SCROLL for midway =====
const midwayTrack = document.querySelector('.midway-track');
if (midwayTrack) {
  let isDown = false, startX, scrollLeft;
  midwayTrack.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - midwayTrack.offsetLeft;
    scrollLeft = midwayTrack.scrollLeft;
  });
  midwayTrack.addEventListener('mouseleave', () => { isDown = false; });
  midwayTrack.addEventListener('mouseup', () => { isDown = false; });
  midwayTrack.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - midwayTrack.offsetLeft;
    const walk = (x - startX) * 1.5;
    midwayTrack.scrollLeft = scrollLeft - walk;
  });
}

// ===== CAROUSEL ARMS =====
const arms = document.querySelectorAll('.carousel-arm');
arms.forEach((arm, i) => {
  arm.style.setProperty('--start-angle', (i * 60) + 'deg');
});

// ===== SMOOTH SCROLL FOR NAV =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
