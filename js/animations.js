const animatedElements = document.querySelectorAll('.fade-up, .card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  },
  { threshold: 0.2 }
);

animatedElements.forEach((element) => observer.observe(element));

const counters = document.querySelectorAll('[data-count]');

const runCounter = (counter) => {
  const target = Number(counter.dataset.count);
  let current = 0;
  const increment = Math.max(1, Math.ceil(target / 90));

  const tick = () => {
    current = Math.min(target, current + increment);
    counter.textContent = current.toLocaleString();
    if (current < target) {
      requestAnimationFrame(tick);
    }
  };

  tick();
};

counters.forEach((counter) => runCounter(counter));
