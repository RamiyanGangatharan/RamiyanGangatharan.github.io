export function initializeCarousel() {
    let index = 0;
    const slides = document.querySelectorAll(".carousel-images img");
    const descriptions = document.querySelectorAll(".carousel-descriptions .description");
    if (slides.length === 0 || descriptions.length === 0) {
        return;
    }
    function showSlide(n) {
    }
    function moveSlide(n) {
        showSlide(index += n);
    }
    showSlide(index);
    setInterval(() => {
        moveSlide(1);
    }, 5000);
}
//# sourceMappingURL=carousel.js.map