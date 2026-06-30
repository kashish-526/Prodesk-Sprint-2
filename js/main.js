/**
 * PRODESK IT — main.js
 * ─────────────────────────────────────────────────────────────
 * Sprint 2 Additions on top of Sprint 1:
 *
 * Phase 1 — State Injection & DOM Manipulation
 *   · Hydrates every section from PRODESK_DATA (data.js)
 *   · FAQ accordion: state mutation via textContent (XSS-safe)
 *
 * Phase 2 — LocalStorage & Session Persistence
 *   · Theme preference persisted (no-flicker inline script in <head>)
 *   · App state (faqOpenIndex) serialised to localStorage on every mutation
 *
 * Phase 3 — Memory Leak Prevention & Custom Event Emitter
 *   · All addEventListener calls tracked in _listeners registry
 *   · destroyListeners() clears every listener + EventBus (exposed as window.__prodeskDestroy)
 *   · EventBus (PubSub from eventbus.js) used for theme, menu, faq, sparkline events
 *   · IntersectionObservers call unobserve() on each element after firing
 */

'use strict';

/* ================================================================
   CONSTANTS & STATE
   ================================================================ */
const THEME_KEY = 'prodesk-theme';
const STATE_KEY = 'prodesk-state';

let appState = {
  theme:        'dark',
  faqOpenIndex: null
};

/* ── Listener registry (Phase 3) ── */
const _listeners = [];

function addListener(el, type, fn, opts) {
  el.addEventListener(type, fn, opts);
  _listeners.push({ el, type, fn, opts });
}

function destroyListeners() {
  _listeners.forEach(({ el, type, fn, opts }) => el.removeEventListener(type, fn, opts));
  _listeners.length = 0;
  EventBus.clear();
  console.info('[Prodesk] All event listeners removed. Memory clean.');
}

/* ================================================================
   STATE PERSISTENCE (Phase 2)
   ================================================================ */
function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) Object.assign(appState, JSON.parse(raw));
  } catch (_) {}
}

function saveState() {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(appState));
  } catch (_) {}
}

function mutateState(patch) {
  Object.assign(appState, patch);
  saveState();
  EventBus.emit('state:change', appState);
}

/* ================================================================
   THEME (Phase 2 — persists on every toggle, no-flicker via <head>)
   ================================================================ */
function getTheme() {
  const s = localStorage.getItem(THEME_KEY);
  if (s === 'dark' || s === 'light') return s;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem(THEME_KEY, t);
  mutateState({ theme: t });

  const btn = document.getElementById('theme-btn');
  if (btn) {
    btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-pressed', String(t === 'light'));
  }

  EventBus.emit('theme:change', { theme: t });
}

applyTheme(getTheme());

/* ================================================================
   DOM HELPERS (Phase 1 — XSS-safe mutations)
   ================================================================ */
function setHTML(el, html) { if (el) el.innerHTML = html; }
function setText(el, text) { if (el) el.textContent = text; }
function stars(n) {
  return Array(n).fill('<span class="testi-card__star" aria-hidden="true">★</span>').join('');
}

/* ================================================================
   HYDRATION — Services (Phase 1)
   ================================================================ */
function hydrateServices() {
  const d    = PRODESK_DATA.services;
  const grid = document.querySelector('.services__grid');
  if (!grid) return;

  setText(document.querySelector('#services .section-hd__eyebrow'), d.eyebrow);
  setHTML(document.querySelector('#services .section-hd__title'),   d.title);
  setText(document.querySelector('#services .section-hd__sub'),     d.sub);

  grid.innerHTML = d.items.map(svc => `
    <article class="svc-card reveal" role="listitem" data-service="${svc.id}">
      <div class="svc-card__img-box">
        <img src="${svc.image}" alt="${svc.alt}" loading="lazy" width="100%" height="160">
      </div>
      <h3 class="svc-card__title">${svc.title}</h3>
      <p class="svc-card__desc">${svc.desc}</p>
      <div class="svc-card__tech" aria-label="Technologies">
        ${svc.tags.map(t => `<span class="svc-card__pill">${t}</span>`).join('')}
      </div>
    </article>`).join('');
}

/* ================================================================
   HYDRATION — Metrics (Phase 1)
   ================================================================ */
function hydrateMetrics() {
  const d    = PRODESK_DATA.metrics;
  const grid = document.querySelector('.metrics__grid');
  if (!grid) return;

  setText(document.querySelector('#results .section-hd__eyebrow'), d.eyebrow);
  setHTML(document.querySelector('#results .section-hd__title'),   d.title);
  setText(document.querySelector('#results .section-hd__sub'),     d.sub);

  grid.innerHTML = d.items.map(m => `
    <article class="metric-card reveal" role="listitem">
      <div class="metric-card__number" aria-label="${m.ariaLabel}">
        ${m.prefix || ''}<span data-count="${m.value}" data-decimals="${m.decimals}">0</span>${m.suffix}
      </div>
      <p class="metric-card__label">${m.label}</p>
    </article>`).join('');
}

/* ================================================================
   HYDRATION — Testimonials (Phase 1)
   ================================================================ */
function hydrateTestimonials() {
  const d    = PRODESK_DATA.testimonials;
  const grid = document.querySelector('.testimonials__grid');
  if (!grid) return;

  setText(document.querySelector('#clients .section-hd__eyebrow'), d.eyebrow);
  setText(document.querySelector('#clients .section-hd__title'),   d.title);
  setText(document.querySelector('#clients .section-hd__sub'),     d.sub);

  grid.innerHTML = d.items.map(t => `
    <article class="testi-card reveal" role="listitem">
      <div class="testi-card__rating" aria-label="${t.stars} out of 5 stars">
        ${stars(t.stars)}
      </div>
      <blockquote class="testi-card__quote">${t.quote}</blockquote>
      <footer class="testi-card__author">
        <div class="testi-card__avatar" aria-hidden="true">${t.initials}</div>
        <div>
          <p class="testi-card__name">${t.name}</p>
          <p class="testi-card__role">${t.role}</p>
        </div>
      </footer>
    </article>`).join('');
}

/* ================================================================
   FAQ ACCORDION — State Mutation demo (Phase 1 + 2)
   ================================================================ */
const FAQ_DATA = [
  { q: 'How long does a typical cloud migration take?',
    a: 'Most migrations complete in 4–10 weeks depending on workload complexity. We provide a phased plan with clear milestones so you always know what\'s next.' },
  { q: 'Do you offer 24/7 support?',
    a: 'Yes. All managed service plans include round-the-clock monitoring and a P1 response time of under 4 minutes via our dedicated NOC.' },
  { q: 'Can Prodesk work with our existing DevOps toolchain?',
    a: 'Absolutely. We integrate with GitHub, GitLab, Jira, PagerDuty, Slack and only introduce new tooling when it genuinely improves outcomes.' },
  { q: 'What does "hypercare" mean after a migration?',
    a: 'Hypercare is our 90-day post-migration concierge. Our engineers stay embedded in your workflows resolving issues in real time and tuning performance before handover.' },
  { q: 'Is there a minimum contract length?',
    a: 'No lock-in. Managed service plans are month-to-month. Project-based engagements are scoped per deliverable with no forced renewals.' }
];

function hydrateFAQ() {
  const section = document.getElementById('faq');
  if (!section) return;
  const list = section.querySelector('.faq__list');
  if (!list) return;

  list.innerHTML = FAQ_DATA.map((_, i) => `
    <div class="faq__item" data-faq-index="${i}">
      <button class="faq__question" type="button"
        aria-expanded="false" aria-controls="faq-answer-${i}" id="faq-btn-${i}">
        <span class="faq__q-text"></span>
        <span class="faq__icon" aria-hidden="true">+</span>
      </button>
      <div class="faq__answer" id="faq-answer-${i}"
        role="region" aria-labelledby="faq-btn-${i}" hidden>
        <p class="faq__answer-text"></p>
      </div>
    </div>`).join('');

  // XSS-safe text injection (Phase 1 requirement)
  list.querySelectorAll('.faq__item').forEach((item, i) => {
    setText(item.querySelector('.faq__q-text'),    FAQ_DATA[i].q);
    setText(item.querySelector('.faq__answer-text'), FAQ_DATA[i].a);
  });

  // Restore persisted open FAQ (Phase 2)
  if (appState.faqOpenIndex !== null) openFAQ(list, appState.faqOpenIndex);

  // Click handler via EventBus (Phase 3 decoupling)
  addListener(list, 'click', function (e) {
    const btn = e.target.closest('.faq__question');
    if (!btn) return;
    const idx = parseInt(btn.closest('.faq__item').dataset.faqIndex, 10);
    EventBus.emit('faq:toggle', { index: idx, list });
  });

  EventBus.on('faq:toggle', function ({ index, list }) {
    const current = appState.faqOpenIndex;
    if (current === index) {
      closeFAQ(list, index);
      mutateState({ faqOpenIndex: null });
    } else {
      if (current !== null) closeFAQ(list, current);
      openFAQ(list, index);
      mutateState({ faqOpenIndex: index });
    }
  });
}

function openFAQ(list, i) {
  const item = list.querySelector(`[data-faq-index="${i}"]`);
  if (!item) return;
  item.querySelector('.faq__question').setAttribute('aria-expanded', 'true');
  item.querySelector('.faq__answer').removeAttribute('hidden');
  setText(item.querySelector('.faq__icon'), '−');
  item.classList.add('is-open');
}

function closeFAQ(list, i) {
  const item = list.querySelector(`[data-faq-index="${i}"]`);
  if (!item) return;
  item.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
  item.querySelector('.faq__answer').setAttribute('hidden', '');
  setText(item.querySelector('.faq__icon'), '+');
  item.classList.remove('is-open');
}

/* ================================================================
   COUNTER ANIMATION
   ================================================================ */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!('IntersectionObserver' in window) || !counters.length) return;

  const co = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseFloat(el.getAttribute('data-count'));
      const dec    = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const dur    = 1800, t0 = performance.now();

      (function tick(now) {
        const p = Math.min((now - t0) / dur, 1);
        el.textContent = ((1 - Math.pow(1 - p, 3)) * target).toFixed(dec);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(dec);
      })(performance.now());

      co.unobserve(el); // Phase 3: no leak
    });
  }, { threshold: 0.5 });

  counters.forEach(el => co.observe(el));
}

/* ================================================================
   REVEAL ANIMATIONS
   ================================================================ */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const ro = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      ro.unobserve(entry.target); // Phase 3: explicit unobserve
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => ro.observe(el));
}

/* ================================================================
   SCROLL SPY
   ================================================================ */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === '#' + id;
        link.classList.toggle('navbar__link--active', active);
        active ? link.setAttribute('aria-current', 'page') : link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-38% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => spy.observe(s));
}

/* ================================================================
   MAIN BOOTSTRAP
   ================================================================ */
document.addEventListener('DOMContentLoaded', function () {

  loadState(); // Phase 2

  // Phase 1 — hydrate DOM from JSON
  hydrateServices();
  hydrateMetrics();
  hydrateTestimonials();
  hydrateFAQ();

  // Re-init observers AFTER hydration so injected elements are picked up
  initReveal();
  initCounters();
  initScrollSpy();

  /* THEME TOGGLE */
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    addListener(themeBtn, 'click', function () {
      const cur = document.documentElement.getAttribute('data-theme');
      applyTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }

  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  addListener(mq, 'change', function (e) {
    if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches ? 'dark' : 'light');
  });

  /* NAVBAR SCROLL */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    function onScroll() { navbar.classList.toggle('navbar--scrolled', window.scrollY > 20); }
    addListener(window, 'scroll', onScroll, { passive: true });
    onScroll();
  }

  /* HAMBURGER */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu   = document.getElementById('mobile-menu');
  const menuOverlay  = document.getElementById('menu-overlay');
  let menuOpen       = false;

  function openMenu() {
    menuOpen = true;
    hamburgerBtn.classList.add('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');
    mobileMenu.classList.add('is-open');
    menuOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    mobileMenu.querySelectorAll('.navbar__mobile-item').forEach((item, i) => {
      item.style.transitionDelay = (0.06 + i * 0.055) + 's';
      item.classList.add('is-visible');
    });
    EventBus.emit('menu:open');
  }

  function closeMenu() {
    menuOpen = false;
    hamburgerBtn.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
    mobileMenu.classList.remove('is-open');
    menuOverlay.classList.remove('is-visible');
    document.body.style.overflow = '';
    mobileMenu.querySelectorAll('.navbar__mobile-item').forEach(item => {
      item.style.transitionDelay = '0s';
      item.classList.remove('is-visible');
    });
    EventBus.emit('menu:close');
  }

  if (hamburgerBtn) addListener(hamburgerBtn, 'click', () => menuOpen ? closeMenu() : openMenu());
  if (menuOverlay)  addListener(menuOverlay, 'click', closeMenu);

  document.querySelectorAll('.navbar__mobile-link').forEach(link => {
    addListener(link, 'click', closeMenu);
  });

  addListener(document, 'keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });

  /* SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    addListener(a, 'click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) * 16 || 72;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH - 12, behavior: 'smooth' });
      if (menuOpen) closeMenu();
    });
  });

  /* SPARKLINE */
  const sparks = document.querySelectorAll('.dashboard__spark-bar');
  if (sparks.length) {
    const sparkInterval = setInterval(function () {
      sparks.forEach(bar => {
        if (!bar.classList.contains('dashboard__spark-bar--peak'))
          bar.style.height = Math.floor(Math.random() * 65 + 22) + '%';
      });
      EventBus.emit('sparkline:update');
    }, 2600);

    // Phase 3: clear interval on page unload — prevents leak
    addListener(window, 'beforeunload', () => clearInterval(sparkInterval));
  }

  /* COPYRIGHT */
  setText(document.getElementById('year'), String(new Date().getFullYear()));

  /* Phase 3: Expose for DevTools memory testing */
  window.__prodeskDestroy = destroyListeners;

  /* ROTATING EYEBROW  */
  (function initEyebrowRotator() {
    const words = document.querySelectorAll('.hero__eyebrow-word');
    if (!words.length) return;
    let current = 0;

    const rotatorInterval = setInterval(function () {
      const prev = current;
      current = (current + 1) % words.length;

      words[prev].classList.remove('is-active');
      words[prev].classList.add('is-leaving');
      setTimeout(() => words[prev].classList.remove('is-leaving'), 420);

      words[current].classList.add('is-active');
      EventBus.emit('eyebrow:rotate', { index: current });
    }, 2200);

    // Phase 3: clear on unload
    addListener(window, 'beforeunload', () => clearInterval(rotatorInterval));
  })();

  console.info('[Prodesk Sprint 2] Initialised');
  console.info('  Active EventBus events:', EventBus.activeEvents());
  console.info('  Registered DOM listeners:', _listeners.length);
  console.info('  State:', appState);
  console.info('  Run window.__prodeskDestroy() to test memory cleanup.');

}); // end DOMContentLoaded