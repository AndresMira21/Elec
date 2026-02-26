// js/dark-mode.js
(() => {
  'use strict';

  const STORAGE_KEY = 'theme';
  const root = document.documentElement;

  function getToggleButton() {
    return document.getElementById('theme-toggle');
  }

  function setTheme(theme, btn) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (btn) {
        btn.textContent = '☀️';
        btn.setAttribute('aria-label', 'Cambiar a modo claro');
      }
    } else {
      root.removeAttribute('data-theme');
      if (btn) {
        btn.textContent = '🌙';
        btn.setAttribute('aria-label', 'Cambiar a modo oscuro');
      }
    }
  }

  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;

    const prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    return prefersDark ? 'dark' : 'light';
  }

  function initDarkMode() {
    const btn = getToggleButton();
    if (!btn) return;

    // Inicializa tema al cargar
    let currentTheme = getInitialTheme();
    setTheme(currentTheme, btn);

    // Alternar
    btn.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      currentTheme = isDark ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, currentTheme);
      setTheme(currentTheme, btn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
  } else {
    initDarkMode();
  }
})();