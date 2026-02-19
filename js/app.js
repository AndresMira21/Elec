// js/app.js
(() => {
  'use strict';

  /* Selectores encapsulados para evitar variables globales */
  const $ = {
    header: () => document.querySelector('header'),
    navLinks: () => document.querySelectorAll('header nav a'),
    menuButton: () => document.querySelector('header button'),
    ctas: () => document.querySelectorAll('section button'),
    internalLinks: () => document.querySelectorAll('a[href^="#"]'),
    contactSection: () => document.getElementById('contacto'),
    contactForm: () => document.getElementById('contact-form'),
    formFeedback: () => document.getElementById('form-feedback'),
    revealTargets: () => document.querySelectorAll('section article, section h2, section p'),
    counters: () => document.querySelectorAll('[data-counter]'),
    modalOpen: () => document.querySelectorAll('[data-modal-open]'),
    modalClose: () => document.querySelectorAll('[data-modal-close]')
  };

  /* Inicializa el menú responsive desplegable
     - Si no hay botón de menú en el HTML, se añade comportamiento al botón existente en header
  */
  function initMenu() {
    const btn = $.menuButton();
    const navLinks = $.navLinks();
    if (!btn || !navLinks.length) return;

    // Estado accesible
    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      // Alternar visibilidad simple
      document.querySelector('header nav').style.display = expanded ? 'block' : 'block';
      // En pantallas pequeñas el CSS debe ocultar/mostrar; aquí solo actualizamos aria
    });

    // Cerrar menú al hacer click en un enlace (útil en móvil)
    document.querySelector('header nav').addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && window.innerWidth <= 900) {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Scroll suave entre secciones para enlaces internos */
  function initSmoothScroll() {
    $.internalLinks().forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* Validación de formulario con mensajes dinámicos
     - Requiere que el HTML tenga form con id contact-form y un elemento con id form-feedback
     - Mensajes accesibles usando aria-live en el HTML (recomendado)
  */
  function initFormValidation() {
    const form = $.contactForm();
    const feedback = $.formFeedback();
    if (!form || !feedback) return;

    function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      feedback.textContent = '';
      feedback.classList.remove('error', 'success');

      const name = (form.querySelector('[name="name"]') || {}).value || '';
      const email = (form.querySelector('[name="email"]') || {}).value || '';
      const message = (form.querySelector('[name="message"]') || {}).value || '';

      if (!name.trim() || !email.trim() || !message.trim()) {
        feedback.textContent = 'Por favor completa todos los campos.';
        feedback.classList.add('error');
        return;
      }
      if (!isValidEmail(email)) {
        feedback.textContent = 'Ingresa un correo válido.';
        feedback.classList.add('error');
        return;
      }

      feedback.textContent = 'Enviando...';
      // Simulación de envío asíncrono
      setTimeout(() => {
        feedback.textContent = 'Gracias — tu mensaje fue enviado.';
        feedback.classList.add('success');
        form.reset();
      }, 700);
    });
  }

  /* Botón CTA con evento interactivo
     - Añade efecto visual y puede llevar al usuario al formulario de contacto
  */
  function initCTAs() {
    const ctas = $.ctas();
    if (!ctas.length) return;
    ctas.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Si el botón tiene href o data-action se puede personalizar
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 500);
        // Si es CTA principal, scroll al contacto
        const contact = $.contactSection();
        if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* Animación activada por scroll usando IntersectionObserver
     - Añade clase in-view a los elementos cuando entran en viewport
  */
  function initRevealOnScroll() {
    const targets = $.revealTargets();
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // opcional: unobserve para no volver a disparar
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach(t => observer.observe(t));
  }

  /* Contador animado opcional
     - Elementos con atributo data-counter="1000" se animan hasta ese número
  */
  function initCounters() {
    const counters = $.counters();
    if (!counters.length) return;

    counters.forEach(el => {
      const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
      let current = 0;
      const duration = 900; // ms
      const stepTime = Math.max(16, Math.floor(duration / Math.max(1, target / 10)));
      const step = Math.max(1, Math.floor(target / (duration / stepTime)));

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = current;
        }
      }, stepTime);
    });
  }

  /* Modal emergente opcional
     - Botones con data-modal-open="idModal" abren el modal con id=idModal
     - Botones con data-modal-close="idModal" cierran el modal
  */
  function initModal() {
    const opens = $.modalOpen();
    const closes = $.modalClose();
    if (!opens.length && !closes.length) return;

    opens.forEach(btn => {
      const id = btn.getAttribute('data-modal-open');
      if (!id) return;
      const modal = document.getElementById(id);
      if (!modal) return;
      btn.addEventListener('click', () => modal.classList.add('open'));
    });

    closes.forEach(btn => {
      const id = btn.getAttribute('data-modal-close');
      if (!id) return;
      const modal = document.getElementById(id);
      if (!modal) return;
      btn.addEventListener('click', () => modal.classList.remove('open'));
    });

    // Cerrar modal con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
      }
    });
  }

  /* Inicializador principal */
  function init() {
    initMenu();
    initSmoothScroll();
    initFormValidation();
    initCTAs();
    initRevealOnScroll();
    initCounters();
    initModal();
    // quitar logs para producción
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
