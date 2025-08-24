document.addEventListener('DOMContentLoaded', () => {
  const unitRadios = document.querySelectorAll('input[name="unit"]');
  const heightUnit = document.getElementById('height-unit');
  const form = document.getElementById('bmi-form');
  const out = document.getElementById('bmi-result');

  function updateUnit() {
    const unit = document.querySelector('input[name="unit"]:checked').value;
    heightUnit.textContent = unit === 'cm' ? '(cm)' : '(m)';
  }
  unitRadios.forEach(r => r.addEventListener('change', updateUnit));
  updateUnit();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const unit = document.querySelector('input[name="unit"]:checked').value;
    const h = parseFloat(document.getElementById('height').value);
    const w = parseFloat(document.getElementById('weight').value);

    if (!h || !w || h <= 0 || w <= 0) {
      out.textContent = 'Please enter valid positive numbers for height and weight.';
      out.style.color = 'var(--danger)';
      return;
    }

    let meters = h;
    if (unit === 'cm') meters = h / 100.0;

    const bmi = w / (meters * meters);
    const rounded = Math.round(bmi * 10) / 10;

    let cat = '';
    if (rounded < 18.5) cat = 'Underweight';
    else if (rounded < 25) cat = 'Normal';
    else if (rounded < 30) cat = 'Overweight';
    else cat = 'Obese';

    out.style.color = 'inherit';
    out.innerHTML = `<strong>Your BMI is ${rounded}</strong> — ${cat}`;
  });

  form.addEventListener('reset', () => { out.textContent = ''; });
});
