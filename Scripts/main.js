"use strict";

function Start() {
    console.log("App Started!");
    initializeCarousel();
    loadProjects();
}

function initializeCarousel() {
    // Carousel
    let index = 0;
    const slides = document.querySelectorAll(".carousel-images img");
    const descriptions = document.querySelectorAll(".carousel-descriptions .description");

    function showSlide(n) {
        if (n >= slides.length) index = 0;
        if (n < 0) index = slides.length - 1;

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            descriptions[i].style.display = "none"; // Hide all descriptions
        }

        slides[index].style.display = "block"; // Show the current slide
        descriptions[index].style.display = "block"; // Show the matching description
    }

    function moveSlide(n) {
        showSlide(index += n);
    }

    showSlide(index); // Initialize the first slide
    setInterval(() => { moveSlide(1); }, 5000); // Change slides every 5 seconds
}

// Portfolio projects functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectsContainer = document.getElementById('projects-container');
    const loadMoreButton = document.getElementById('loadMore');

    // Sample list of projects with fake data
    let projects =
    [
        {
            title: 'Project One',
            description: 'A brief description of Project One.',
            imageUrl: "Images/NY-SKYLINE.webp"
        },
        {
            title: 'Project Two',
            description: 'A brief description of Project Two.',
            imageUrl: "Images/YYZ-SKYLINE.webp"
        },
        {
            title: 'Project Three',
            description: 'A brief description of Project Three.',
            imageUrl: "Images/england_skyline.jpg"
        },
        {
            title: 'Project Four',
            description: 'A brief description of Project Four.',
            imageUrl: "Images/PWC_OFFICE.webp"
        },
        {
            title: 'Project Five',
            description: 'A brief description of Project Five.',
            imageUrl: "Images/cup-team-photo-2023-2.png"
        },
        {
            title: 'Project Six',
            description: 'A brief description of Project Six.',
            imageUrl: "Images/CVPRW2023_EventVision_group_picture.jpg"
        }
    ];

    // Function to create project card
    function createProjectCard(project) {
        let card = document.createElement('div');
        card.className = 'col-lg-4 col-md-6 mb-4';
        card.innerHTML = `
            <div class="card h-100">
                <img style="margin-top: 15px; height: 250px" src="${project.imageUrl}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                </div>
            </div>
        `;
        return card;
    }

    // Function to load projects
    function loadProjects(numProjects = 3) {
        let projectsToLoad = projects.splice(0, numProjects); // Splice modifies the original array
        projectsToLoad.forEach(project => {
            projectsContainer.appendChild(createProjectCard(project));
        });

        if (projects.length === 0) {
            loadMoreButton.disabled = true;
        }
    }

    // Initial load of projects
    loadProjects();

    // Event listener for 'Load More' button
    loadMoreButton.addEventListener('click', function() {
        loadProjects(); // Load more projects
    });
});

// Ensure the Start function is called when the window is loaded
window.addEventListener("load", Start);
