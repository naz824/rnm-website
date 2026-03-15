const toggle = document.querySelector('[data-nav-toggle]');
const navList = document.querySelector('.site-nav__list');
const stickyHeader = document.querySelector('[data-sticky-nav]');

if (toggle && navList) {
  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navList.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

window.addEventListener('scroll', () => {
  if (!stickyHeader) return;
  stickyHeader.classList.toggle('is-scrolled', window.scrollY > 20);
});
