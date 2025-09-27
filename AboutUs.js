// AboutUs.js - reveal-on-scroll, counters, newsletter micro UX
document.addEventListener('DOMContentLoaded', () => {
  // reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('is-visible');
        obs.unobserve(ent.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // animated counters (elements with data-target)
  const counters = document.querySelectorAll('[data-target]');
  counters.forEach(el => {
    const target = Number(el.getAttribute('data-target')) || 0;
    if (!target) return;
    const counterObserver = new IntersectionObserver((entries, obs2) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(el, target, 1100);
          obs2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counterObserver.observe(el);
  });

  function animateCount(el, target, duration) {
    const stepTime = Math.max(Math.floor(duration / Math.max(target, 1)), 20);
    let current = 0;
    const increment = Math.ceil(target / (duration / stepTime));
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = current.toLocaleString();
      }
    }, stepTime);
  }

  // newsletter micro UX (simulated)
  const newsletter = document.getElementById('newsletterForm');
  if (newsletter) {
    newsletter.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('newsletterEmail');
      if (!input || !input.value.trim()) {
        alert('Please enter a valid email.');
        return;
      }
      const btn = newsletter.querySelector('button');
      btn.disabled = true;
      btn.textContent = 'Subscribing...';
      setTimeout(() => {
        alert('Thanks — you are subscribed to Euro Travel updates.');
        newsletter.reset();
        btn.disabled = false;
        btn.textContent = 'Subscribe';
      }, 900);
    });
  }

  // make sure current about nav link is active (if used)
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(a => {
    if (a.getAttribute('href') && a.getAttribute('href').includes('about')) {
      a.classList.add('active');
    }
  });
});
