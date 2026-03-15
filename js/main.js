const doc = document;
const root = doc.documentElement;

const select = (selector, scope = doc) => scope.querySelector(selector);
const selectAll = (selector, scope = doc) => [...scope.querySelectorAll(selector)];

const navToggle = select('[data-nav-toggle]');
const nav = select('[data-nav]');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open');
  });

  selectAll('.nav__link', nav).forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const countdownTarget = new Date('2026-04-11T17:00:00-04:00').getTime();
const timerEl = select('[data-countdown]');

function formatCountdown(num) {
  return String(num).padStart(2, '0');
}

function updateCountdown() {
  if (!timerEl) return;

  const now = Date.now();
  const distance = countdownTarget - now;

  if (distance <= 0) {
    timerEl.innerHTML = '<strong>00</strong><span>Days</span><strong>00</strong><span>Hours</span><strong>00</strong><span>Minutes</span><strong>00</strong><span>Seconds</span>';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  const fields = {
    days: formatCountdown(days),
    hours: formatCountdown(hours),
    minutes: formatCountdown(minutes),
    seconds: formatCountdown(seconds)
  };

  Object.entries(fields).forEach(([key, value]) => {
    const element = select(`[data-${key}]`, timerEl);
    if (element) element.textContent = value;
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

const revealItems = selectAll('.reveal');
if (revealItems.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const accordionButtons = selectAll('.accordion__button');
accordionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const panel = button.nextElementSibling;

    button.setAttribute('aria-expanded', String(!expanded));

    if (panel) {
      panel.style.maxHeight = expanded ? '0px' : `${panel.scrollHeight}px`;
    }
  });
});

const testimonialItems = selectAll('[data-testimonial]');
let testimonialIndex = 0;

function rotateTestimonials() {
  if (testimonialItems.length < 2) return;

  testimonialItems.forEach((item, index) => {
    item.classList.toggle('is-active', index === testimonialIndex);
  });

  testimonialIndex = (testimonialIndex + 1) % testimonialItems.length;
}

rotateTestimonials();
setInterval(rotateTestimonials, 5500);

const backToTop = select('[data-back-to-top]');

if (backToTop) {
  doc.addEventListener('scroll', () => {
    const show = window.scrollY > 420;
    backToTop.classList.toggle('is-visible', show);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const newsletterForms = selectAll('[data-newsletter]');
newsletterForms.forEach((form) => {
  const message = select('.form-message', form);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailInput = select('input[type="email"]', form);
    const nameInput = select('input[name="name"]', form);

    const email = emailInput ? emailInput.value.trim() : '';
    const name = nameInput ? nameInput.value.trim() : '';

    if (nameInput && name.length < 2) {
      if (message) message.textContent = 'Please enter your full name before subscribing.';
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validEmail) {
      if (message) message.textContent = 'Please provide a valid email address.';
      emailInput?.focus();
      return;
    }

    if (message) {
      message.textContent = 'Thanks for signing up! We will send market updates and vendor alerts soon.';
    }

    form.reset();
  });
});

selectAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId.length <= 1) return;

    const target = select(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const lazyImages = selectAll('img[loading="lazy"]');
if ('IntersectionObserver' in window && lazyImages.length > 0) {
  const lazyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const dataSrc = img.getAttribute('data-src');
        if (dataSrc) img.src = dataSrc;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '100px' });

  lazyImages.forEach((img) => lazyObserver.observe(img));
}

const themeToggle = select('[data-theme-toggle]');
const themeKey = 'rnm-theme';

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
}

applyTheme(localStorage.getItem(themeKey) || 'dark');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(themeKey, next);
  });
}

const slides = selectAll('.hero-carousel__slide');
const dots = selectAll('.hero-carousel__dot');
let slideIndex = 0;

function setSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
}

if (slides.length > 1) {
  setSlide(slideIndex);
  setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    setSlide(slideIndex);
  }, 5200);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      slideIndex = index;
      setSlide(slideIndex);
    });
  });
}
