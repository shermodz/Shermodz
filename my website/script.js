const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
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
    const answers = { q1: 'General Relativity', q2: 'AC Polyphase', q3: 'Standard Model' };

    let score = 0;
    Object.entries(answers).forEach(([key, value]) => {
      if (data.get(key) === value) score += 1;
    });

    quizResult.textContent = `You scored ${score}/${Object.keys(answers).length}. Keep exploring science with SHERMODZ!`;
  });
}

const filterInput = document.getElementById('subjectFilter');
const cards = document.querySelectorAll('#subjectGrid .subject-card');
const filterMessage = document.getElementById('filterMessage');

if (filterInput && cards.length && filterMessage) {
  const applyFilter = () => {
    const query = filterInput.value.trim().toLowerCase();
    let visible = 0;

    cards.forEach(card => {
      const bucket = (card.dataset.subject || '').toLowerCase();
      const text = card.textContent.toLowerCase();
      const match = !query || bucket.includes(query) || text.includes(query);
      card.style.display = match ? 'block' : 'none';
      if (match) visible += 1;
    });

    filterMessage.textContent = query
      ? `${visible} subject${visible === 1 ? '' : 's'} found for "${query}".`
      : '';
  };

  filterInput.addEventListener('input', applyFilter);
}
