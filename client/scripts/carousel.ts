//carousel
export function initializeCarousel(): void {
    let index: number = 0; // Current slide index
    // Selects all carousel images and descriptions using querySelectorAll
    const slides: NodeListOf<HTMLElement> = document.querySelectorAll(".carousel-images img") as NodeListOf<HTMLElement>;
    const descriptions: NodeListOf<HTMLElement> = document.querySelectorAll(".carousel-descriptions .description") as NodeListOf<HTMLElement>;

    // Exit function early if no slides or descriptions found
    if (slides.length === 0 || descriptions.length === 0) {
        return;
    }

    // Displays the slide and its corresponding description based on the current index
    function showSlide(n: number): void {
        // Looping logic for carousel

    }

    // Advances the carousel to the next or previous slide
    function moveSlide(n: number): void {
        showSlide(index += n);
    }

    showSlide(index); // Initialize the first slide

    // Change slides every 5 seconds
    setInterval((): void => {
        moveSlide(1);
    }, 5000);
}

