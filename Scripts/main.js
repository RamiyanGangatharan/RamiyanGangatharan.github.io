/**
 * @author: Ramiyan Gangatharan
 * Student ID: 100835223
 * @date: January 27, 2024
 */

"use strict";

/**
 * Initializes the application, sets up the carousel, and loads initial projects.
 */
function Start() {
    console.log("App Started!");
    initializeCarousel();
    fetchFactOfTheDay();

    switch (document.title) {
        case "Team":
            displayModal();
            break;
    }

    loadHeader(); // Load the header
    loadFooter(); // Load the footer
}

window.addEventListener("load", Start);
// CAROUSEL
/**
 * Initializes the carousel functionality, setting up the rotation of images and their corresponding descriptions.
 */
function initializeCarousel() {
    // Carousel
    let index = 0;
    const slides = document.querySelectorAll(".carousel-images img");
    const descriptions = document.querySelectorAll(".carousel-descriptions .description");

    /**
     * Displays the slide and its corresponding description based on the current index.
     * @param {number} n - The number to add to the current index to determine the next slide to display.
     */

    if (slides.length === 0 || descriptions.length === 0) {
        return; // Exit the function if no slides or descriptions found
    }
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

    /**
     * Advances the carousel to the next or previous slide.
     * This function updates the current slide index and ensures the carousel displays the correct slide.
     * If the end of the slide array is reached, it loops back to the beginning, and vice versa.
     *
     * @param {number} n - The number of slides to move. Positive to advance, negative to go back.
     * @example
     * // Advances to the next slide
     * moveSlide(1);
     *
     * // Moves back to the previous slide
     * moveSlide(-1);
     */
    function moveSlide(n) {
        showSlide(index += n);
    }

    showSlide(index); // Initialize the first slide
    setInterval(() => {
        moveSlide(1);
    }, 5000); // Change slides every 5 seconds
}

// PORTFOLIO
/**
 * Event listener for DOMContentLoaded event to ensure that the DOM is fully loaded before initializing project-related functionalities.
 */
document.addEventListener('DOMContentLoaded', function() {
    const projectsContainer = document.getElementById('projects-container');
    const loadMoreButton = document.getElementById('loadMore');

    let projects = [{
        title: 'Project One',
        description: 'A brief description of Project One.',
        imageUrl: "../../Images/NY-SKYLINE.webp"
    },
        {
            title: 'Project Two',
            description: 'A brief description of Project Two.',
            imageUrl: "../../Images/YYZ-SKYLINE.webp"
        },
        {
            title: 'Project Three',
            description: 'A brief description of Project Three.',
            imageUrl: "../../Images/england_skyline.jpg"
        },
        {
            title: 'Project Four',
            description: 'A brief description of Project Four.',
            imageUrl: "../../Images/PWC_OFFICE.webp"
        },
        {
            title: 'Project Five',
            description: 'A brief description of Project Five.',
            imageUrl: "../../Images/cup-team-photo-2023-2.png"
        },
        {
            title: 'Project Six',
            description: 'A brief description of Project Six.',
            imageUrl: "../../Images/CVPRW2023_EventVision_group_picture.jpg"
        }
    ];

    /**
     * Creates an HTML card element containing project details.
     * @param {Object} project - The project data.
     * @param {string} project.title - The title of the project.
     * @param {string} project.description - A brief description of the project.
     * @param {string} project.imageUrl - The URL of the project's image.
     * @returns {HTMLElement} The project card element.
     */
    function createProjectCard(project) {
        let card = document.createElement('div');
        card.className = 'col-lg-4 col-md-6 mb-4';
        card.innerHTML = `
            <div class="card h-100">
                <img style="margin-top: 15px; height: 250px" 
                    src="${project.imageUrl}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                </div>
            </div>
        `;
        return card;
    }

    /**
     * Loads a specified number of projects from the projects array and appends them to the projects container.
     * If there are no more projects to load, disables the 'Load More' button.
     * @param {number} [numProjects=3] - The number of projects to load each time the function is called.
     */
    function loadProjects(numProjects = 3) {
        let projectsToLoad = projects.splice(0, numProjects);
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
        loadProjects();
    });
});

window.addEventListener("load", Start);


/**
 * @author: Joy Tejada
 * Student ID: 100883359
 * @date: 2024-01-27
 */

// Teams Page: Modal
// Get the modal
function displayModal() {
    let openRamiyan = document.getElementById("open-ramiyan");
    let openJoy = document.getElementById("open-joy");
    let modalRamiyan = document.getElementById('ramiyan-modal');
    let modalJoy = document.getElementById("joy-modal");
    let closeRamiyan = document.getElementById("closeRamiyan");
    let closeJoy = document.getElementById("closeJoy");

    openRamiyan.addEventListener("click", () => {
        openRamiyan.modal("show");
    });

    openJoy.addEventListener("click", () => {
        modalJoy.showModal();
    });

    closeRamiyan.addEventListener("click", () => {
        modalRamiyan._hideModal();
    });

    closeJoy.addEventListener("click", () => {
        modalJoy._hideModal();
    });
}

/**
 * Created by Ramiyan Gangatharan
 * @param method
 * @param url
 * @param callback
 * @constructor
 */
function AJAX_REQUEST(method, url, callback)
{
    // Step 1:instantiate new XHR object
    let xhr = new XMLHttpRequest();
    // Step 2: open XHR request
    xhr.open(method, url);

    // Step 4: Add event listener for the readystatechange event
    // This event is triggered when the state of a document being fetched changes
    xhr.addEventListener("readystatechange", () =>
    {
        if(xhr.readyState === 4 && xhr.status === 200)
        {
            if(typeof callback == "function")
            {
                callback(xhr.responseText);
            }
            else
            {
                console.error("ERROR: CALLBACK NOT A FUNCTION");
            }
        }
    });

    // Step 3: send XHR request
    xhr.send();


}
// Function to load the header
function loadHeader() {
    fetch('/views/components/header.html') // Use root-relative path
        .then(response => response.text())
        .then(html => {
            document.getElementById('site-header').innerHTML = html;
        })
        .catch(error => {
            console.warn('Error loading the header:', error);
        });
}

// Function to load the footer
function loadFooter() {
    fetch('/views/components/footer.html') // Use root-relative path
        .then(response => response.text())
        .then(html => {
            document.getElementById('site-footer').innerHTML = html;
        })
        .catch(error => {
            console.warn('Error loading the footer:', error);
        });
}


document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
});

// EVENTS

document.addEventListener('DOMContentLoaded', function() {
    // Define the callback function to process the response
    /**
     * This function grabs content from the JSON file
     * @param responseText
     */
    function processEventsData(responseText) {
        const data = JSON.parse(responseText);
        const events = data.events;
        const eventsContainer = document.getElementById('events-container');

        // Clear out any existing content in the events container
        eventsContainer.innerHTML = '';

        // Iterate over each event and create the HTML structure
        events.forEach(event => {
            let eventElement = document.createElement('div');
            eventElement.className = 'col-md-4 mb-4';
            eventElement.innerHTML = `
                <div class="card">
                    <img src="${event.imageUrl}" class="card-img-top" alt="${event.title}">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <p class="card-text">${event.description}</p>
                    </div>
                </div> 
            `;

            // Append the newly created element to the 'events-container' div
            eventsContainer.appendChild(eventElement);
        });
    }

    // Use the AJAX_REQUEST function to fetch the events.json file
    new AJAX_REQUEST('GET', '../../data/events.json', processEventsData);
});

/**
 *
 */
function fetchFactOfTheDay() {
    const limit = 1; // Since you only want a single fact
    const apiKey = 'NhKexKzfF0TmdyXL/Jj/0Q==MMvyNrvqLLVQWkS2'; // It's best practice to keep API keys hidden, not in front-end code

    $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/facts?limit=${limit}`,
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
        success: function(result) {
            // Log the result to debug
            console.log(result);

            // Check if result is an array and has at least one element with a 'fact' property
            if (Array.isArray(result) && result.length > 0 && typeof result[0].fact === 'string') {
                $('#fact-of-the-day').text(result[0].fact);
            } else {
                console.error('Unexpected result structure:', result);
            }
        },
        /**
         *
         * @param jqXHR
         */
        error: function(jqXHR) {
            console.error('Error fetching fact of the day:', jqXHR.responseText || 'Unknown error');
        }
    });
}
