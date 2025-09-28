document.getElementById("loginForm").addEventListener("submit", function (e) {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("loginMessage");

  // Reset message
  message.textContent = "";
  message.style.color = "red";

  // Validation checks
  if (username === "" || password === "") {
    e.preventDefault();
    message.textContent = "⚠️ Please fill in both fields.";
    return;
  }

  if (password.length < 6) {
    e.preventDefault();
    message.textContent = "🔒 Password must be at least 6 characters.";
    return;
  }

  // Optional: Add animation
  message.style.opacity = 0;
  message.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    message.style.opacity = 1;
  }, 100);
});
