
// Slideshow
const slides = document.getElementsByClassName('bg-slide');
let currentSlide = 0;
slides[currentSlide].classList.add("active");

function nextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}
setInterval(nextSlide, 5000);



// Scroll-triggered animation for destination cards
function revealOnScroll() {
  const destinations = document.querySelectorAll('.destination');
  const triggerBottom = window.innerHeight * 0.85;

  destinations.forEach(dest => {
    const boxTop = dest.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      dest.classList.add('visible');
    } else {
      dest.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
// Animate paper plane around the screen
const plane = document.getElementById("paperPlane");
let angle = 0;
let radius = 150;
let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

function animatePlane() {
  angle += 0.02;
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle / 2); // elliptical path

  plane.style.left = x + "px";
  plane.style.top = y + "px";
  plane.style.transform = `rotate(${angle * 30}deg)`; // dynamic rotation
  requestAnimationFrame(animatePlane);
}

animatePlane();
