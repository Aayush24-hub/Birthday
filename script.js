/* =============================================
   script.js — Birthday Website Interactivity
   ============================================= */

/* ---- Gallery Data ---- */
const galleryData = [
  { src: 'photo1.png', caption: 'Radiant & graceful — you wear every moment like royalty 👑' },
  { src: 'photo2.jpg', caption: 'You bloom wherever you go 🌻' },
  { src: 'photo3.png', caption: 'Effortlessly stunning — always 💫' },
  { src: 'photo4.jpg', caption: 'A vision in every season 🌹' },
  { src: 'moments/1000030766.jpg', caption: 'A snapshot of how beautiful you are, always 🌸' },
  { src: 'moments/1000030767.jpg', caption: 'You glow wherever you go, Tapsu Baby ✨' },
  { src: 'moments/1000030776.jpg', caption: 'Golden moments with the most golden person I know 💛' }
];

let currentLightboxIndex = 0;

/* ---- Lightbox ---- */
function openLightbox(index) {
  currentLightboxIndex = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  img.src = galleryData[index].src;
  img.alt = galleryData[index].caption;
  cap.textContent = galleryData[index].caption;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(event, force = false) {
  if (force || (event && event.target === document.getElementById('lightbox'))) {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
  }
}

function lightboxNav(direction, event) {
  event.stopPropagation();
  currentLightboxIndex = (currentLightboxIndex + direction + galleryData.length) % galleryData.length;
  openLightbox(currentLightboxIndex);
}

/* Keyboard nav for lightbox */
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox(null, true);
  if (e.key === 'ArrowLeft') lightboxNav(-1, { stopPropagation: () => {} });
  if (e.key === 'ArrowRight') lightboxNav(1, { stopPropagation: () => {} });
});

/* ---- Floating Particles ---- */
function createParticles() {
  const container = document.getElementById('particles');
  const colors = [
    'rgba(212,160,23,0.6)',
    'rgba(240,192,64,0.5)',
    'rgba(250,224,122,0.6)',
    'rgba(240,160,190,0.4)',
    'rgba(248,200,216,0.5)',
    'rgba(255,215,0,0.4)'
  ];

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 10 + 4;
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 12 + 8}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(particle);
  }
}

/* ---- Floating Butterflies ---- */
function createButterflies() {
  const container = document.getElementById('butterflies');
  const icons = ['🦋', '🌸', '🌻', '✨', '💛', '🌺'];

  for (let i = 0; i < 18; i++) {
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly-float';
    butterfly.textContent = icons[Math.floor(Math.random() * icons.length)];
    butterfly.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 12}s;
      font-size: ${Math.random() * 1.2 + 0.8}rem;
    `;
    container.appendChild(butterfly);
  }
}

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.wish-card, .gallery-item, .msg-card, .celebrate-card, .section-header'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stagger children if msg-card
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    observer.observe(el);
  });
}

/* ---- Confetti Rain on Load ---- */
function launchConfetti() {
  const emojis = ['🌻', '🦋', '🌸', '✨', '💛', '🎉', '🎊', '⭐'];
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed; inset: 0; pointer-events: none; z-index: 9999; overflow: hidden;
  `;
  document.body.appendChild(container);

  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const startX = Math.random() * 100;
    const duration = Math.random() * 2 + 2;
    const delay = Math.random() * 3;
    const size = Math.random() * 1.5 + 0.8;
    el.style.cssText = `
      position: absolute;
      left: ${startX}%;
      top: -60px;
      font-size: ${size}rem;
      animation: confettiFall ${duration}s ${delay}s ease-in forwards;
    `;
    container.appendChild(el);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes confettiFall {
      0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
      80%  { opacity: 1; }
      100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    container.remove();
    style.remove();
  }, 6000);
}

/* ---- Smooth Active Nav ---- */
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => observer.observe(s));
}

/* ---- Gallery item: touch support (show overlay on tap) ---- */
function initGalleryTouch() {
  const items = document.querySelectorAll('.gallery-frame');
  items.forEach(item => {
    item.addEventListener('touchstart', () => {
      items.forEach(i => i.classList.remove('touch-active'));
      item.classList.add('touch-active');
    }, { passive: true });
  });

  const momentMedias = document.querySelectorAll('.moment-card--photo .moment-media');
  momentMedias.forEach(item => {
    item.addEventListener('touchstart', () => {
      momentMedias.forEach(i => i.classList.remove('touch-active'));
      item.classList.add('touch-active');
    }, { passive: true });
  });
}

/* ---- Init ---- */
window.addEventListener('DOMContentLoaded', () => {
  createParticles();
  createButterflies();
  initScrollReveal();
  initGalleryTouch();

  // Slight delay to allow fonts to load before confetti
  setTimeout(launchConfetti, 800);
});

/* Touch-active CSS via JS */
const touchStyle = document.createElement('style');
touchStyle.textContent = `
  .gallery-frame.touch-active .gallery-overlay { opacity: 1 !important; }
`;
document.head.appendChild(touchStyle);

/* ---- Music Player ---- */
function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const musicIcon = document.getElementById('musicIcon');
  const musicWaves = document.getElementById('musicWaves');

  if (audio.paused) {
    audio.play().catch(err => console.log('Autoplay blocked:', err));
    musicIcon.textContent = '⏸';
    musicWaves.classList.add('active');
  } else {
    audio.pause();
    musicIcon.textContent = '▶';
    musicWaves.classList.remove('active');
  }
}

/* Auto-play music on page load */
window.addEventListener('load', () => {
  const audio = document.getElementById('bg-music');
  const musicIcon = document.getElementById('musicIcon');
  const musicWaves = document.getElementById('musicWaves');
  
  // Try to autoplay
  audio.play().then(() => {
    musicIcon.textContent = '⏸';
    musicWaves.classList.add('active');
  }).catch(err => {
    // Autoplay blocked - user needs to click play button
    console.log('Autoplay blocked. User will need to click play button.');
  });
});
