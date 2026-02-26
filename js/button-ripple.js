// js/button-ripple.js
export function initButtonRipple(selector = '.btn') {
  const buttons = document.querySelectorAll(selector);
  if (!buttons.length) return;

  buttons.forEach(btn => {
    // Defensive: ensure relative positioning
    const style = getComputedStyle(btn);
    if (style.position === 'static') btn.style.position = 'relative';

    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      // compute offset from center to allow centered expansion
      const x = `${e.clientX - rect.left - rect.width / 2}px`;
      const y = `${e.clientY - rect.top - rect.height / 2}px`;

      btn.style.setProperty('--ripple-x', x);
      btn.style.setProperty('--ripple-y', y);

      // restart animation
      btn.classList.remove('ripple-animate');
      void btn.offsetWidth; // force reflow
      btn.classList.add('ripple-animate');

      // cleanup after animation
      setTimeout(() => btn.classList.remove('ripple-animate'), 700);
    }, {passive: true});
  });
}
