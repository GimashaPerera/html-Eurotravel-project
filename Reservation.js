// ---------------- Clock ----------------
function updateClock() {
    const now = new Date();
    let h = now.getHours().toString().padStart(2,'0');
    let m = now.getMinutes().toString().padStart(2,'0');
    let s = now.getSeconds().toString().padStart(2,'0');
    document.getElementById('navClock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// ---------------- Background Slideshow ----------------
const slides = document.querySelectorAll('.bg-slide');
let currentSlide = 0;
slides[currentSlide].classList.add('active');
function nextSlide(){
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide+1)%slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(nextSlide,5000);

// ---------------- Help Bot ----------------
const botIcon = document.getElementById('botIcon');
const botChat = document.getElementById('botChat');
botIcon.addEventListener('click',()=>{ 
    botChat.style.display = botChat.style.display==='block'?'none':'block';
});

// ---------------- Calculator ----------------
const calcModal = document.getElementById('calcModal');
const openCalc = document.getElementById('openCalc');
const closeCalc = document.getElementById('closeCalc');
const calcScreen = document.getElementById('calcScreen');
const calcButtons = document.querySelectorAll('.calc-buttons button');
openCalc.addEventListener('click',()=>{calcModal.style.display='block';});
closeCalc.addEventListener('click',()=>{calcModal.style.display='none';});
window.addEventListener('click',(e)=>{if(e.target==calcModal) calcModal.style.display='none';});
let currentInput='';
calcButtons.forEach(btn=>{
    btn.addEventListener('click',()=>{
        if(btn.id==='clear'){currentInput='';}
        else if(btn.id==='equals'){
            try{currentInput=eval(currentInput);}catch{currentInput='Error';}
        } else {currentInput+=btn.textContent;}
        calcScreen.value=currentInput;
    });
});

// ---------------- Form Submit ----------------
const form=document.getElementById('reservationForm');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    alert('Reservation submitted successfully!');
    form.reset();
});
