const setMessage = (form, message, isError = false) => {
  const target = form.querySelector('[data-form-message]');
  if (!target) return;
  target.textContent = message;
  target.classList.toggle('is-error', isError);
};

const validateRequired = (form) => {
  const fields = [...form.querySelectorAll('[required]')];
  const invalid = fields.find((field) => !field.value.trim());
  return !invalid;
};

document.querySelectorAll('form[data-vendor-form], form[data-signup-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailField = form.querySelector('input[type="email"]');
    const emailValue = emailField?.value.trim() ?? '';

    if (!validateRequired(form)) {
      setMessage(form, 'Please complete all required fields.', true);
      return;
    }

    if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setMessage(form, 'Please enter a valid email address.', true);
      return;
    }

    form.reset();
    setMessage(form, 'Thanks! Your submission has been received. We will follow up soon.');
  });
});

document.querySelectorAll('form[data-newsletter]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.querySelector('input[type="email"]');
    if (!email || !email.value.trim()) return;
    form.innerHTML = '<p role="status">Thank you! You are subscribed for market updates.</p>';
  });
});
