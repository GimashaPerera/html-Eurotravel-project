// Animate steps on scroll
const steps = document.querySelectorAll('.step');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

steps.forEach(step => observer.observe(step));

// Redirect to Reservation.html
function goToReservation() {
  window.location.href = "Reservation.html";
}

// Progress bar on scroll
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progressBar').style.width = scrollPercent + '%';
});
