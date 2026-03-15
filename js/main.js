import './navigation.js';
import './animations.js';
import './forms.js';

const targetDate = new Date('2026-04-11T17:00:00-04:00');

const updateCountdown = () => {
  const diff = targetDate.getTime() - Date.now();
  const safeDiff = Math.max(0, diff);

  const day = Math.floor(safeDiff / 86400000);
  const hour = Math.floor((safeDiff / 3600000) % 24);
  const minute = Math.floor((safeDiff / 60000) % 60);
  const second = Math.floor((safeDiff / 1000) % 60);

  const values = { days: day, hours: hour, minutes: minute, seconds: second };
  Object.entries(values).forEach(([key, value]) => {
    const element = document.querySelector(`[data-${key}]`);
    if (element) {
      element.textContent = String(value).padStart(2, '0');
    }
  });
};

updateCountdown();
setInterval(updateCountdown, 1000);

document.querySelectorAll('.accordion__button').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = button.nextElementSibling;
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    if (panel) {
      panel.style.maxHeight = expanded ? '0px' : `${panel.scrollHeight}px`;
    }
  });
});

const testimonials = [...document.querySelectorAll('.testimonial')];
let index = 0;
if (testimonials.length > 1) {
  setInterval(() => {
    testimonials[index].classList.remove('is-active');
    index = (index + 1) % testimonials.length;
    testimonials[index].classList.add('is-active');
  }, 5500);
}

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');

document.querySelectorAll('.gallery img').forEach((image) => {
  image.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = image.src;
    lightbox.classList.add('is-open');
  });
});

lightbox?.addEventListener('click', () => {
  lightbox.classList.remove('is-open');
});

const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('is-visible', window.scrollY > 400);
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const root = document.documentElement;
const savedTheme = localStorage.getItem('rnm-theme');
if (savedTheme) {
  root.dataset.theme = savedTheme;
}

document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  localStorage.setItem('rnm-theme', next);
});

const search = document.querySelector('[data-vendor-search]');
search?.addEventListener('input', () => {
  const query = search.value.toLowerCase();
  document.querySelectorAll('[data-vendor]').forEach((vendor) => {
    vendor.hidden = !vendor.textContent.toLowerCase().includes(query);
  });
});
