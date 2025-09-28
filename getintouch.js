// AOS Animations
AOS.init({ duration: 1000, once: true });

// Year Auto Update
document.getElementById("year").textContent = new Date().getFullYear();

// Contact Form Validation
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const msg = document.getElementById("formMsg");
    if (!form.checkValidity()) {
      msg.textContent = "⚠️ Please fill all fields correctly.";
      msg.style.color = "red";
    } else {
      msg.textContent = "✅ Message sent successfully!";
      msg.style.color = "green";
      form.reset();
    }
  });
}
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop default form submit

  let formData = new FormData(this);

  fetch("insert.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("formMsg").innerText = data;
      document.getElementById("formMsg").style.color =
        data.includes("success") ? "green" : "red";
      if (data.includes("success")) {
        document.getElementById("contactForm").reset();
      }
    })
    .catch((error) => {
      document.getElementById("formMsg").innerText =
        "Something went wrong. Try again!";
      document.getElementById("formMsg").style.color = "red";
    });
});

const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progress.style.width = `${scrolled}%`;
});

// ================================
// BACK TO TOP BUTTON
// ================================
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    toTop.classList.add("show");
  } else {
    toTop.classList.remove("show");
  }
});

// Animate form elements on scroll
document.addEventListener("DOMContentLoaded", () => {
  const formSection = document.querySelector(".form-section");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          formSection.style.opacity = 1;
          formSection.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  formSection.style.opacity = 0;
  formSection.style.transform = "translateY(40px)";
  formSection.style.transition = "all 0.8s ease-out";

  observer.observe(formSection);
});

// Animate form elements on scroll
document.addEventListener("DOMContentLoaded", () => {
  const formSection = document.querySelector(".form-section");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          formSection.style.opacity = 1;
          formSection.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  formSection.style.opacity = 0;
  formSection.style.transform = "translateY(40px)";
  formSection.style.transition = "all 0.8s ease-out";

  observer.observe(formSection);
});
