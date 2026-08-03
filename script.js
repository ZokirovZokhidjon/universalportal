const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');
const carouselIndicators = document.querySelectorAll('.carousel-indicators span');

let currentSlide = 0;

function showSlide(n) {
    carousel.style.transform = `translateX(-${n * 100}%)`;
    carouselIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === n);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselItems.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    showSlide(currentSlide);
}

carouselPrev.addEventListener('click', prevSlide);
carouselNext.addEventListener('click', nextSlide);

carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Автоматик слайд-шоу учун:
setInterval(nextSlide, 5000); // Ҳар 5 сонияда кейинги слайдга ўтади