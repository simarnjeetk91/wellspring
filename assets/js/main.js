document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(el => io.observe(el));

  function bindEmailForm(formId, templateId){
    const form = document.getElementById(formId);
    if (!form) return;

    const required = form.querySelectorAll('[required]');
    const emailInput = form.querySelector('input[type="email"]');

    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth()+1).padStart(2,'0');
      const dd = String(today.getDate()).padStart(2,'0');
      dateInput.min = `${yyyy}-${mm}-${dd}`;
    }

  }

  bindEmailForm('appt-form', 'appointment_template');
  bindEmailForm('contact-form', 'contact_template');
});
