// ---------------- Clock ----------------
function updateClock() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();

    // Add leading zero
    if (h < 10) { h = "0" + h; }
    if (m < 10) { m = "0" + m; }
    if (s < 10) { s = "0" + s; }

    document.getElementById('navClock').textContent = h + ":" + m + ":" + s;
}
setInterval(updateClock, 1000);
updateClock();

// ---------------- Background Slideshow ----------------
var slides = document.getElementsByClassName('bg-slide');
var currentSlide = 0;
slides[currentSlide].className += " active";

function nextSlide() {
    slides[currentSlide].className = slides[currentSlide].className.replace(" active", "");
    currentSlide++;
    if (currentSlide >= slides.length) { currentSlide = 0; }
    slides[currentSlide].className += " active";
}
setInterval(nextSlide, 5000);

// ---------------- Help Bot ----------------
var botIcon = document.getElementById('botIcon');
var botChat = document.getElementById('botChat');

botIcon.onclick = function () {
    if (botChat.style.display === "block") {
        botChat.style.display = "none";
    } else {
        botChat.style.display = "block";
    }
};

// ---------------- Calculator ----------------
var calcModal = document.getElementById('calcModal');
var openCalc = document.getElementById('openCalc');
var closeCalc = document.getElementById('closeCalc');
var calcScreen = document.getElementById('calcScreen');
var calcButtons = document.querySelectorAll('.calc-buttons button');
var currentInput = "";

openCalc.onclick = function () { calcModal.style.display = "block"; };
closeCalc.onclick = function () { calcModal.style.display = "none"; };

window.onclick = function (e) {
    if (e.target == calcModal) {
        calcModal.style.display = "none";
    }
};

for (var i = 0; i < calcButtons.length; i++) {
    calcButtons[i].onclick = function () {
        if (this.id === "clear") {
            currentInput = "";
        } else if (this.id === "equals") {
            try {
                currentInput = eval(currentInput);
            } catch (err) {
                currentInput = "Error";
            }
        } else {
            currentInput += this.textContent;
        }
        calcScreen.value = currentInput;
    }
}

// ---------------- Form Submit ----------------
var form = document.getElementById('reservationForm');
form.onsubmit = function (e) {
    e.preventDefault();
    alert("Reservation submitted successfully!");
    form.reset();
};
