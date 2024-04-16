/**
 * @author: Joy Tejada
 * Student ID: 100883359
 * @date: 2024-01-27
 */

// Teams Page: Modal
// Get the modal
function displayModal(): void {
    const openRamiyan: HTMLElement | null = document.getElementById("open-ramiyan");
    const openJoy: HTMLElement | null = document.getElementById("open-joy");
    const modalRamiyan: HTMLElement | null = document.getElementById('ramiyan-modal');
    const modalJoy: HTMLElement | null = document.getElementById("joy-modal");
    const closeRamiyan: HTMLElement | null = document.getElementById("closeRamiyan");
    const closeJoy: HTMLElement | null = document.getElementById("closeJoy");

    if (openRamiyan instanceof HTMLElement) {
        openRamiyan.addEventListener("click", (): void => {
            modalRamiyan?.classList.add("show");
        });
    }

    if (openJoy instanceof HTMLElement) {
        openJoy.addEventListener("click", (): void => {
            modalJoy?.classList.add("show");
        });
    }

    if (closeRamiyan instanceof HTMLElement) {
        closeRamiyan.addEventListener("click", (): void => {
            modalRamiyan?.classList.remove("show");
        });
    }

    if (closeJoy instanceof HTMLElement) {
        closeJoy.addEventListener("click", (): void => {
            modalJoy?.classList.remove("show");
        });
    }
}

function openModal(): void {
    const modal = document.getElementById("myModal");
    if (modal) { // Check if the modal is not null
        modal.style.display = "block";
    } else {
        console.warn("Modal element not found");
    }
}

function closeModal(): void {
    const modal = document.getElementById("myModal");
    if (modal) { // Check if the modal is not null
        modal.style.display = "none";
    } else {
        console.warn("Modal element not found");
    }
}

let slideIndex: number = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n: number): void {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n: number): void {
    showSlides(slideIndex = n);
}

function showSlides(n: number): void {
    let slides: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>; // Cast to specific element type
    let dots: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("demo") as HTMLCollectionOf<HTMLElement>; // Assuming dots can be treated as HTMLElements
    let captionText: HTMLElement | null = document.getElementById("caption");

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Now TypeScript knows `style` exists
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Ensure slideIndex is within bounds to avoid accessing undefined elements
    if (slideIndex - 1 < slides.length && slideIndex - 1 < dots.length) {
        slides[slideIndex - 1].style.display = "block"; // Safe to access `style`
        dots[slideIndex - 1].className += " active";
        // Check if captionText is not null and dots are HTMLElements (for 'alt')
        if (captionText !== null && dots[slideIndex - 1] instanceof HTMLElement) {
            captionText.innerHTML = dots[slideIndex - 1].getAttribute('alt') || ""; // Use getAttribute for 'alt'
        }
    }
}
