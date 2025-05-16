function showSlide(slideNumber) {
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === slideNumber - 1) {
            slide.classList.add('active');
        }
    });
}

