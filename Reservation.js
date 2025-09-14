// ---------------- Clock ----------------
function updateClock() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    document.getElementById('navClock').textContent = h + ":" + m + ":" + s;
}
setInterval(updateClock, 1000);
updateClock();

// ---------------- Background Slideshow ----------------
var slides = document.getElementsByClassName('bg-slide');
var currentSlide = 0;
slides[currentSlide].classList.add("active");
function nextSlide() {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
}
setInterval(nextSlide, 5000);

// ---------------- Calculate Cost ----------------
document.getElementById('calculate').onclick = function () {
    var pkg = document.getElementById('package').value;
    var people = parseInt(document.getElementById('people').value);
    var fromDate = new Date(document.getElementById('fromDate').value);
    var toDate = new Date(document.getElementById('toDate').value);

    if (!pkg || !people || isNaN(fromDate) || isNaN(toDate)) {
        alert("Please fill all fields before calculating.");
        return;
    }

    var pkgParts = pkg.split(","); // ["Spain","700","7"]
    var country = pkgParts[0];
    var costPerPerson = parseFloat(pkgParts[1]);
    var days = parseInt(pkgParts[2]);

    var totalCost = costPerPerson * people; // simple multiplication

    document.getElementById('calculationResult').textContent =
        `Package: ${country}, Pax: ${people}, Days: ${days}, Total Cost: $${totalCost}`;
};

// ---------------- Form Submit ----------------
var form = document.getElementById('reservationForm');
form.onsubmit = function (e) {
    e.preventDefault();
    alert("Reservation submitted successfully!");
    form.reset();
    document.getElementById('calculationResult').textContent = "";
};


// ---------------- Help Bot ----------------
var botIcon = document.getElementById('botIcon');
var botChat = document.getElementById('botChat');
botIcon.onclick = () => {
    botChat.style.display = botChat.style.display === "block" ? "none" : "block";
};

document.getElementById('botSend').onclick = () => {
    const input = document.getElementById('botInput').value;
    if(input) alert("Bot: Thanks for your message! We'll get back to you soon.");
    document.getElementById('botInput').value = '';
};
