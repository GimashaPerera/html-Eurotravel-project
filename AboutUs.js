// AboutUs.js
document.addEventListener('DOMContentLoaded', () => {
  /* Reveal on scroll */
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if (revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));
  }

  /* Metric counters */
  document.querySelectorAll('.metric-number').forEach(counter => {
    const target = parseInt(counter.dataset.target || '0', 10);
    if (!target) return;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 120));
    const update = () => {
      current += step;
      if (current >= target) {
        counter.textContent = target.toLocaleString();
      } else {
        counter.textContent = current.toLocaleString();
        requestAnimationFrame(update);
      }
    };
    const cObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        update();
        cObs.unobserve(counter);
      }
    }, { threshold: 0.5 });
    cObs.observe(counter);
  });

  /* Reviews (localStorage) */
  const STORAGE_KEY = 'eurotravel_reviews_v1';
  const defaultReviews = [
    { name: 'Aisha', rating: 5, text: 'Amazing trip! Everything was perfect.' },
    { name: 'Kamal', rating: 4, text: 'Great service and wonderful guide.' },
    { name: 'Maya', rating: 5, text: 'Best holiday we ever had — thank you!' }
  ];

  function loadReviews() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) { localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultReviews)); return defaultReviews.slice(); }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) return defaultReviews.slice();
      return parsed;
    } catch (err) {
      console.warn(err); return defaultReviews.slice();
    }
  }
  function saveReviews(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch (e) { console.warn(e); }
  }

  let reviews = loadReviews();

  /* Carousel */
  const wrapper = document.querySelector('.carousel-wrapper');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentIndex = 0;
  let autoTimer = null;
  const AUTO_MS = 6000;

  function createItem(r, idx) {
    const item = document.createElement('div');
    item.className = 'carousel-item' + (idx === currentIndex ? ' show' : '');
    const stars = '★'.repeat(Math.max(0, Math.min(5, r.rating || 0))) + '☆'.repeat(5 - Math.max(0, Math.min(5, r.rating || 0)));
    item.innerHTML = `<div class="review-stars">${stars}</div>
                      <p class="review-text">${escapeHtml(r.text || '')}</p>
                      <p class="review-author">— ${escapeHtml(r.name || 'Anonymous')}</p>`;
    return item;
  }

  function render() {
    if (!wrapper) return;
    wrapper.innerHTML = '';
    reviews.forEach((r, i) => wrapper.appendChild(createItem(r, i)));
    if (currentIndex > reviews.length - 1) currentIndex = Math.max(0, reviews.length - 1);
    updatePos();
  }

  function updatePos() {
    const items = wrapper.querySelectorAll('.carousel-item');
    items.forEach((it, idx) => it.classList.toggle('show', idx === currentIndex));
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function prev() { const items = wrapper.querySelectorAll('.carousel-item'); if (!items.length) return; currentIndex = (currentIndex - 1 + items.length) % items.length; updatePos(); resetAuto(); }
  function next() { const items = wrapper.querySelectorAll('.carousel-item'); if (!items.length) return; currentIndex = (currentIndex + 1) % items.length; updatePos(); resetAuto(); }

  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);
  document.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); });

  function startAuto() { if (autoTimer) clearInterval(autoTimer); autoTimer = setInterval(() => { const items = wrapper.querySelectorAll('.carousel-item'); if (items.length > 1) { currentIndex = (currentIndex + 1) % items.length; updatePos(); } }, AUTO_MS); }
  function resetAuto() { if (autoTimer) { clearInterval(autoTimer); startAuto(); } }

  render();
  startAuto();

  /* Pause rotation on hover/focus for accessibility */
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => { if (autoTimer) clearInterval(autoTimer); });
    wrapper.addEventListener('mouseleave', () => startAuto());
    wrapper.addEventListener('focusin', () => { if (autoTimer) clearInterval(autoTimer); });
    wrapper.addEventListener('focusout', () => startAuto());
  }

  /* Star rating */
  const stars = document.querySelectorAll('.star');
  const ratingInput = document.querySelector('input[name="rating-value"]');

  function setStars(val) {
    stars.forEach(s => s.classList.toggle('filled', +s.dataset.value <= val));
    stars.forEach(s => s.setAttribute('aria-checked', (+s.dataset.value === val).toString()));
  }

  if (stars.length && ratingInput) {
    stars.forEach(star => {
      star.tabIndex = 0;
      star.addEventListener('click', () => {
        const v = Number(star.dataset.value) || 0;
        ratingInput.value = v;
        setStars(v);
      });
      star.addEventListener('mouseover', () => {
        const v = Number(star.dataset.value) || 0;
        stars.forEach(s => s.classList.toggle('filled', Number(s.dataset.value) <= v));
      });
      star.addEventListener('mouseout', () => setStars(Number(ratingInput.value) || 0));
      star.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const v = Number(star.dataset.value) || 0; ratingInput.value = v; setStars(v); } });
    });
  }

  /* Review form */
  const reviewForm = document.getElementById('reviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(reviewForm);
      const name = (fd.get('name') || '').toString().trim();
      const text = (fd.get('review') || '').toString().trim();
      let rating = Number(fd.get('rating-value') || 0);
      if (!rating) rating = 5;
      if (!name || !text) { alert('Please add your name and a review.'); return; }
      const newR = { name, rating: Math.max(1, Math.min(5, rating)), text };
      reviews.push(newR);
      saveReviews(reviews);
      currentIndex = reviews.length - 1;
      render();
      reviewForm.reset();
      if (ratingInput) { ratingInput.value = 0; setStars(0); }
      alert('Thank you! Your review has been added.');
      resetAuto();
    });
  }

  /* Newsletter (local only) */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = (document.getElementById('newsletterEmail') || {}).value || '';
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) { alert('Please enter a valid email.'); return; }
      alert('Thanks for subscribing! (Demo - no emails stored.)');
      newsletterForm.reset();
    });
  }

  /* Helper: escape text for insertion */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (s) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }
});
