// js/card-lazy.js
export function initCardTilt(selector = '.card') {
  if (window.matchMedia('(hover: none)').matches) return;
  const cards = document.querySelectorAll(selector);
  cards.forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 4;
      const rotateX = (0.5 - py) * 4;
      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }, {passive: true});
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
}
