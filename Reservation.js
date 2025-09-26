// ---------------- Clock ----------------
function updateClock() {
    const now = new Date();
    let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    document.getElementById('navClock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// ---------------- Background Slideshow ----------------
const slides = document.querySelectorAll('.bg-slide');
let currentSlide = 0;
slides[currentSlide].classList.add("active");

function nextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
}
setInterval(nextSlide, 5000);

// ---------------- Calculate Cost ----------------
const calcFields = ['toDate', 'fromDate', 'package', 'people'];
calcFields.forEach(id => document.getElementById(id).addEventListener('input', calculateCost));

function calculateCost() {
    const pkg = document.getElementById('package').value;
    const people = parseInt(document.getElementById('people').value);
    const fromDate = new Date(document.getElementById('fromDate').value);
    const toDate = new Date(document.getElementById('toDate').value);

    if (!pkg || !people || !fromDate || !toDate) {
        document.getElementById('calculationResult').textContent = "";
        return;
    }

    if (toDate <= fromDate) {
        alert("⚠️ To date must be after From date.");
        return;
    }

    const [country, costPerPerson] = pkg.split(",");
    const days = Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24));
    const totalCost = costPerPerson * people * days;

    document.getElementById('calculationResult').textContent =
        `Package: ${country}, Pax: ${people}, Days: ${days}, Total Cost: $${totalCost}`;
}

// ---------------- Form Submit ----------------

document.getElementById("reservationForm").addEventListener("submit", function(e) {
    e.preventDefault(); // stop default form submit

    let formData = new FormData(this);

    fetch("EcoTravel.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data.trim() === "success") {
            // Show popup
            showPopup("✅ Reservation Successful");

            // Redirect after a short delay
            setTimeout(() => {
                window.location.href = "Register.html";
            }, 1500); // 1.5 seconds delay
        } else {
            showPopup("❌ Error saving reservation");
        }
    })
    .catch(err => console.error(err));
});

function showPopup(message) {
    let popup = document.createElement("div");
    popup.textContent = message;
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.left = "50%";
    popup.style.transform = "translateX(-50%)";
    popup.style.background = "#2b6de8";
    popup.style.color = "white";
    popup.style.padding = "12px 20px";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.5)";
    popup.style.zIndex = "10000";
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 1500);
}


//--------------------------- chatbot------------------
const chatIcon = document.getElementById('chatIcon');
const chatPopup = document.getElementById('chatPopup');
const closeChat = document.getElementById('closeChat');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');

let isOpen = false;

// Toggle popup on icon click
chatIcon.addEventListener('click', () => {
    isOpen = !isOpen;
    chatPopup.style.display = isOpen ? 'flex' : 'none';
});

// Close button click
closeChat.addEventListener('click', () => {
    chatPopup.style.display = 'none';
    isOpen = false;
});

// Send message
function sendMessage() {
    let msg = chatInput.value.trim();
    if (!msg) return;

    // User message
    let userMsg = document.createElement('div');
    userMsg.classList.add('message', 'user');
    userMsg.textContent = msg;
    chatBody.appendChild(userMsg);

    // Bot response
    let botMsg = document.createElement('div');
    botMsg.classList.add('message', 'bot');
    botMsg.textContent = "You said: " + msg;
    chatBody.appendChild(botMsg);

    // Scroll to latest message
    chatBody.scrollTop = chatBody.scrollHeight;

    chatInput.value = '';
    chatInput.focus();
}

// Send on Enter key
chatInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});
