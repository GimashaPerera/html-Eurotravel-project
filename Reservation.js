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


document.getElementById('toDate').addEventListener('change', calculateCost);
document.getElementById('fromDate').addEventListener('change', calculateCost);
document.getElementById('package').addEventListener('change', calculateCost);
document.getElementById('people').addEventListener('input', calculateCost);

function calculateCost() {
    
    var pkg = document.getElementById('package').value;
    var people1 = parseInt(document.getElementById('people').value);
    var fromDate1 = new Date(document.getElementById('fromDate').value);
    var toDate1 = new Date(document.getElementById('toDate').value);

    if (!pkg || !people1 || !fromDate1 || !toDate1 ) {
         document.getElementById('calculationResult').textContent = "";;
        return;
    }
    var people = people1;
    var fromDate = fromDate1;
    var toDate = toDate1;

    if (toDate <= fromDate) {
        alert("⚠️ To date must be after From date.");
        return;
    }

    var pkgParts = pkg.split(",");
    var country = pkgParts[0];
    var costPerPerson = parseFloat(pkgParts[1]);
    
    //days calculation
    var DayDiff = toDate.getTime() - fromDate.getTime();
    var days = Math.ceil(DayDiff/ (1000 * 60 * 60 * 24));

    //calculation of total cost
    var totalCost = costPerPerson * people *days; 

    document.getElementById('calculationResult').textContent =
        `Package: ${country}, Pax: ${people}, Days: ${days},  Total Cost: $${totalCost}`;
};


// ---------------- Form Submit ----------------
var form = document.getElementById('reservationForm');
form.onsubmit = function (e) {
    e.preventDefault();
    alert("Reservation submitted successfully!");
    form.reset();
    document.getElementById('calculationResult').textContent = "";
};

document.getElementById('botSend').onclick = () => {
    const input = document.getElementById('botInput').value;
    if(input) alert("Bot: Thanks for your message! We'll get back to you soon.");
    document.getElementById('botInput').value = '';
};
