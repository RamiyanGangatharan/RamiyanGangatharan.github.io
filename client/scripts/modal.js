"use strict";
function displayModal() {
    const openRamiyan = document.getElementById("open-ramiyan");
    const openJoy = document.getElementById("open-joy");
    const modalRamiyan = document.getElementById('ramiyan-modal');
    const modalJoy = document.getElementById("joy-modal");
    const closeRamiyan = document.getElementById("closeRamiyan");
    const closeJoy = document.getElementById("closeJoy");
    if (openRamiyan instanceof HTMLElement) {
        openRamiyan.addEventListener("click", () => {
            modalRamiyan?.classList.add("show");
        });
    }
    if (openJoy instanceof HTMLElement) {
        openJoy.addEventListener("click", () => {
            modalJoy?.classList.add("show");
        });
    }
    if (closeRamiyan instanceof HTMLElement) {
        closeRamiyan.addEventListener("click", () => {
            modalRamiyan?.classList.remove("show");
        });
    }
    if (closeJoy instanceof HTMLElement) {
        closeJoy.addEventListener("click", () => {
            modalJoy?.classList.remove("show");
        });
    }
}
function openModal() {
    const modal = document.getElementById("myModal");
    if (modal) {
        modal.style.display = "block";
    }
    else {
        console.warn("Modal element not found");
    }
}
function closeModal() {
    const modal = document.getElementById("myModal");
    if (modal) {
        modal.style.display = "none";
    }
    else {
        console.warn("Modal element not found");
    }
}
let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let captionText = document.getElementById("caption");
    if (n > slides.length)
        slideIndex = 1;
    if (n < 1)
        slideIndex = slides.length;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slideIndex - 1 < slides.length && slideIndex - 1 < dots.length) {
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
        if (captionText !== null && dots[slideIndex - 1] instanceof HTMLElement) {
            captionText.innerHTML = dots[slideIndex - 1].getAttribute('alt') || "";
        }
    }
}
//# sourceMappingURL=modal.js.map