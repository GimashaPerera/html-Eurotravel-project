const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.right-arrow');
const prevButton = document.querySelector('.left-arrow');

let slideWidth = slides[0].getBoundingClientRect().width;
let currentIndex = 0;

// Arrange slides
const setSlidePosition = () => {
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });
};
setSlidePosition();

// Move to slide
const moveToSlide = (index) => {
    track.style.transform = 'translateX(-' + slides[index].style.left + ')';
    currentIndex = index;
};

// Next Button
nextButton.addEventListener('click', () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex > slides.length - 3) nextIndex = 0;
    moveToSlide(nextIndex);
});

// Prev Button
prevButton.addEventListener('click', () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = slides.length - 3;
    moveToSlide(prevIndex);
});

// Auto-slide
setInterval(() => {
    let nextIndex = currentIndex + 1;
    if (nextIndex > slides.length - 3) nextIndex = 0;
    moveToSlide(nextIndex);
}, 3000);

// Resize
window.addEventListener('resize', () => {
    slideWidth = slides[0].getBoundingClientRect().width;
    setSlidePosition();
});
