// js/app.js
(() => {
  'use strict';

  const DOM = {
    year: () => document.getElementById('year'),
    menuToggle: () => document.getElementById('menu-toggle'),
    mainNav: () => document.getElementById('main-nav'),
    cta: () => document.getElementById('cta'),
    form: () => document.getElementById('contact-form'),
    feedback: () => document.getElementById('form-feedback'),
    internalLinks: () => document.querySelectorAll('a[href^="#"]'),
    revealTargets: () => document.querySelectorAll('.card, .testimonios, .hero'),
    counter: () => document.querySelectorAll('[data-counter]'),
    modalOpenBtns: () => document.querySelectorAll('[data-modal-open]'),
    modalCloseBtns: () => document.querySelectorAll('[data-modal-close]'),
  };

  function initYear() {
    const el = DOM.year();
    if (el) el.textContent = new Date().getFullYear();
  }

  function initMenuToggle() {
    const btn = DOM.menuToggle();
    const nav = DOM.mainNav();
    if (!btn || !nav) return;
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.style.display = expanded ? 'none' : 'block';
    });
    // Close menu on link click for mobile
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && window.innerWidth <= 900) {
        btn.setAttribute('aria-expanded', 'false');
        nav.style.display = 'none';
      }
    });
  }

  function initSmoothScroll() {
    DOM.internalLinks().forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function initFormValidation() {
    const form = DOM.form();
    const feedback = DOM.feedback();
    if (!form || !feedback) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      feedback.classList.remove('error');
      if (!name || !email || !message) {
        feedback.textContent = 'Por favor completa todos los campos.';
        feedback.classList.add('error');
        return;
      }
      if (!validateEmail(email)) {
        feedback.textContent = 'Ingresa un correo válido.';
        feedback.classList.add('error');
        return;
      }
      feedback.textContent = 'Enviando...';
      // Simular envío
      setTimeout(() => {
        feedback.textContent = 'Gracias — tu mensaje fue enviado.';
        form.reset();
      }, 700);
    });
  }

  function initRevealOnScroll() {
    const targets = DOM.revealTargets();
    if (!('IntersectionObserver' in window) || targets.length === 0) {
      targets.forEach(t => t.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in-view');
      });
    }, { threshold: 0.15 });
    targets.forEach(t => observer.observe(t));
  }

  function initCTA() {
    const cta = DOM.cta();
    if (!cta) return;
    cta.addEventListener('click', (e) => {
      e.preventDefault();
      cta.classList.add('clicked');
      setTimeout(() => cta.classList.remove('clicked'), 600);
      // ejemplo: scroll al formulario
      const form = document.getElementById('contacto');
      if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Opcional: contador animado (data-counter="1000")
  function initCounters() {
    const counters = DOM.counter();
    if (!counters.length) return;
    counters.forEach(el => {
      const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          clearInterval(interval);
        } else {
          el.textContent = current;
        }
      }, 16);
    });
  }

  // Opcional: modal simple
  function initModal() {
    const openBtns = DOM.modalOpenBtns();
    const closeBtns = DOM.modalCloseBtns();
    if (!openBtns.length) return;
    openBtns.forEach(btn => {
      const id = btn.getAttribute('data-modal-open');
      const modal = document.getElementById(id);
      if (!modal) return;
      btn.addEventListener('click', () => modal.classList.add('open'));
    });
    closeBtns.forEach(btn => {
      const id = btn.getAttribute('data-modal-close');
      const modal = document.getElementById(id);
      if (!modal) return;
      btn.addEventListener('click', () => modal.classList.remove('open'));
    });
  }

  function init() {
    initYear();
    initMenuToggle();
    initSmoothScroll();
    initFormValidation();
    initRevealOnScroll();
    initCTA();
    initCounters();
    initModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
