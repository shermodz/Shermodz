const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('show'));
}

const quizForm = document.getElementById('quizForm');
const quizResult = document.getElementById('quizResult');

if (quizForm && quizResult) {
  quizForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(quizForm);
    const answers = {
      q1: 'General Relativity',
      q2: 'AC Polyphase',
      q3: 'Standard Model'
    };

    let score = 0;
    Object.entries(answers).forEach(([question, answer]) => {
      if (data.get(question) === answer) score += 1;
    });

    const total = Object.keys(answers).length;
    quizResult.textContent = `You scored ${score}/${total}. Keep exploring science with SHERMODZ!`;
  });
}
