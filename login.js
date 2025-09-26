document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("loginMessage");

  if (username === "member123" && password === "securepass") {
    message.style.color = "#00f0ff";
    message.textContent = "Login successful!";
    setTimeout(() => {
      window.location.href = "member-dashboard.html";
    }, 1000);
  } else {
    message.style.color = "#ff6b6b";
    message.textContent = "Invalid username or password.";
  }
});
