/* ============================================================
   script.js  –  ISR Web Portfolio  |  Isa Septriasa Ramadhani
   ============================================================ */

/* ── Navbar scroll shadow ───────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  highlightNav();
}, { passive: true });

/* ── Mobile hamburger ────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
const toggleSpans = navToggle.querySelectorAll('span');

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);

  if (open) {
    toggleSpans[0].style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
    toggleSpans[1].style.cssText = 'opacity:0';
    toggleSpans[2].style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
  } else {
    toggleSpans.forEach(s => s.style.cssText = '');
  }
});

// Close menu when a nav link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
    toggleSpans.forEach(s => s.style.cssText = '');
  });
});

/* ── Active nav link on scroll ───────────────────────────── */
const sections    = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('.nav-menu a');

function highlightNav () {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ── Smooth scroll with offset ───────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 68,
      behavior: 'smooth'
    });
  });
});

/* ── Reveal-on-scroll (cards, about grid, social items) ──── */
const revealEls = document.querySelectorAll(
  '.sk-card, .proj-card, .about-grid, .soc-item, .contact-right'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings
      const siblings = [...revealEls].filter(el =>
        el.parentElement === entry.target.parentElement
      );
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 70}ms`;
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObs.observe(el));

/* ── Skill bar animation ─────────────────────────────────── */
const skillSection = document.querySelector('#skill');
const skillFills   = document.querySelectorAll('.sk-bar-fill');
let skillsDone = false;

const skillObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !skillsDone) {
    skillsDone = true;
    setTimeout(() => {
      skillFills.forEach(fill => fill.classList.add('run'));
    }, 250);
    skillObs.disconnect();
  }
}, { threshold: 0.2 });

if (skillSection) skillObs.observe(skillSection);

/* ── Toast helper ────────────────────────────────────────── */
const toastEl = document.getElementById('toast');
let toastTimer;

function showToast (msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
}

/* ── Contact form ────────────────────────────────────────── */
const msgForm = document.getElementById('msgForm');

if (msgForm) {
  msgForm.addEventListener('submit', e => {
    e.preventDefault();

    const inputs = msgForm.querySelectorAll('input, textarea');
    let allFilled = true;

    inputs.forEach(input => {
      const fldInner = input.closest('.fld-inner');
      if (!input.value.trim()) {
        allFilled = false;
        if (fldInner) {
          fldInner.style.borderColor = '#e91e8c';
          fldInner.style.boxShadow   = '0 0 0 3px rgba(233,30,140,.15)';
          input.addEventListener('input', () => {
            fldInner.style.borderColor = '';
            fldInner.style.boxShadow   = '';
          }, { once: true });
        }
      }
    });

    if (!allFilled) {
      showToast('⚠ Mohon isi semua field terlebih dahulu.');
      return;
    }

    const btn = msgForm.querySelector('.btn-send');
    btn.disabled = true;
    btn.textContent = 'Mengirim...';

    // Simulate async send
    setTimeout(() => {
      msgForm.reset();
      btn.disabled = false;
      btn.textContent = 'Send Message →';
      showToast('✓ Pesan berhasil dikirim!');
    }, 1500);
  });
}

/* ── Console branding ────────────────────────────────────── */
console.log(
  '%c✨ ISR Web — Isa Septriasa Ramadhani',
  'color:#e91e8c; font-weight:700; font-size:13px; font-family:sans-serif;'
);