// ================================
// NAVIGATION MENU
// ================================
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
  hamburger.classList.toggle("open");
});

// ================================
// SCROLL PROGRESS
// ================================
const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progress.style.width = `${scrolled}%`;
});

// ================================
// BACK TO TOP
// ================================
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    toTop.classList.add("show");
  } else {
    toTop.classList.remove("show");
  }
});

// ================================
// CHIP SELECTION
// ================================
const chips = document.querySelectorAll(".chip");
const reasonInput = document.getElementById("reason");

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    reasonInput.value = chip.dataset.reason;
  });
});

// ================================
// CONTACT FORM
// ================================
const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toast");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!contactForm.checkValidity()) {
    showToast("⚠️ Please fill all required fields correctly.");
    return;
  }

  showToast("✅ Message sent successfully!");
  contactForm.reset();
  chips.forEach(c => c.classList.remove("active"));
});

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// ================================
// NEWSLETTER FORM
// ================================
const nlForm = document.getElementById("nlForm");
const nlMsg = document.getElementById("nlMsg");

if (nlForm) {
  nlForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("nlEmail").value;

    if (!email.includes("@")) {
      nlMsg.textContent = "⚠️ Enter a valid email.";
      nlMsg.style.color = "yellow";
      return;
    }

    document.cookie = `newsletter=1;max-age=${60 * 60 * 24 * 30}`;
    nlMsg.textContent = "🎉 Thanks for subscribing!";
    nlMsg.style.color = "#fff";
    nlForm.reset();
  });
}

// ================================
// COOKIE BANNER
// ================================
const cookieBar = document.getElementById("cookieBar");
const acceptBtn = document.getElementById("acceptCookies");
const rejectBtn = document.getElementById("rejectCookies");

if (!document.cookie.includes("cookies_accepted")) {
  cookieBar.classList.add("show");
}

acceptBtn.addEventListener("click", () => {
  document.cookie = "cookies_accepted=1;max-age=" + 60 * 60 * 24 * 30;
  cookieBar.classList.remove("show");
});

rejectBtn.addEventListener("click", () => {
  cookieBar.classList.remove("show");
});

// ================================
// FAQ AUTO ROTATION
// ================================
const faqItems = document.querySelectorAll(".faq p");
let currentFaq = 0;

setInterval(() => {
  faqItems.forEach((f, i) => f.classList.toggle("visible", i === currentFaq));
  currentFaq = (currentFaq + 1) % faqItems.length;
}, 4000);

// ================================
// CLOUD PARALLAX
// ================================
const clouds = document.querySelectorAll(".cloud");

window.addEventListener("scroll", () => {
  const value = window.scrollY;
  clouds.forEach((cloud, i) => {
    let speed = (i + 1) * 0.2;
    cloud.style.transform = `translateX(${value * speed}px)`;
  });
});

// ================================
// AOS INIT
// ================================
AOS.init({
  duration: 1000,
  once: true,
});

// ================================
// YEAR AUTO UPDATE
// ================================
document.getElementById("year").textContent = new Date().getFullYear();
