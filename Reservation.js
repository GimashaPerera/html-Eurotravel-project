// ---------------- Time----------------
function updateClock() {
    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();

    if (h < 10) { h = "0" + h; }
    if (m < 10) { m = "0" + m; }
    if (s < 10) { s = "0" + s; }

    document.getElementById("navClock").innerHTML = h + ":" + m + ":" + s;
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

form.addEventListener("submit", function (e) {
    if (
        !form.package.value ||
        !form.people.value ||
        !form.fromDate.value ||
        !form.toDate.value
    ) {
        e.preventDefault();
        alert("⚠️ Please fill all fields");
    } else {
        alert("✅ Reservation Successful");
    }
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



