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
        case "Register":
            displayRegisterPage();
            break;
        case "Login":
            displayLoginPage();
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
/**
 * Checks if a user is logged in
 * @constructor
 */
function CheckLogin(){
    if(localStorage.length > 0){
        $("#login").html(`<a id="logout" class="nav-link" href="#">
                    <i class="fas fa-sign-out-alt"></i> Logout</a>`);

        let keys = Object.keys(localStorage);

        // Writes the users name if they are logged in on the homepage
        for(const key of keys){
            if(key === "users"){
                let userData = localStorage.getItem(key);
                let usersName = userData.split(",")
                $("#name").html(`<h1 id="name">Welcome ${usersName[0]} to The Harmony Hub</h1>`)
            }
        }
    }

    $("#logout").on("click", function (){
        // Preform Logout
        localStorage.clear();

        // Redirect to login.html page
        location.href = "login.html";
    });
}

/**
 * Regular expressions to help validate the register form
 */
function RegisterFormValidation(){
    // Call for First Name
    ValidateField("#firstName",
        /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
        "Please enter a valid First Name.");

    // Call for Last Name
    ValidateField("#lastName",
        /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
        "Please enter a valid Last Name.");

    // Call for Address
    // Taken from https://regex101.com/library/CtqxiP?filterFlavors=javascript&orderBy=MOST_RECENT&search=
    ValidateField("#address",
        /^(?![ -.&,_'":?!/])(?!.*[- &_'":]$)(?!.*[-.#@&,:?!/]{2})[a-zA-Z0-9- .#@&,_'":.?!/]+$/,
        "Please enter a valid Address.")

    // Call for Phone Number
    ValidateField("#phoneNumber",
        /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
        "Please enter a valid Contact Number.");

    // Call for Email Address
    ValidateField("#emailAddress",
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
        "Please enter a valid Email Address!");


}

/**
 * Validate Form Fields provided by users
 * @param input_field_id
 * @param regular_expression
 * @param error_message
 */
function ValidateField(input_field_id, regular_expression, error_message){
    let messageArea = $("#messageArea").hide();

    $(input_field_id).on("blur", function(){
        let inputFieldText = $(this).val();
        if(!regular_expression.test(inputFieldText)){
            $(this).trigger("focus").trigger("select");

            messageArea.addClass("alert alert-danger").text(error_message).show();
        }else{
            // Full name was successful
            messageArea.removeAttr("class").hide();
        }
    });
}

/**
 * The Register Page
 * When the form is submitted after validation, will check if username already exists,
 * and if the passwords are the same.
 */
function displayRegisterPage(){
    console.log("Called RegisterPage");

    RegisterFormValidation();

    $("#sendButton").on("click", function (){
        let firstName = document.getElementById("firstName");
        let lastName = document.getElementById("lastName");
        let address = document.getElementById("address");
        let phoneNumber = document.getElementById("phoneNumber");
        let emailAddress = document.getElementById("emailAddress");
        let username = document.getElementById("username");
        let password = document.getElementById("password");
        let confirmPassword = document.getElementById("confirmPassword");

        let success = true;
        let newUser = new core.User();
        let messageArea = $("#messageArea").hide();

        $.get("../../data/user.json", function(data){
            for(const user of data.users){
                // Check if username doesn't exist and if the passwords match
                if(username.value === user.Username){
                    success = false;
                    console.log("true");
                    break;
                }
            }
            if(success === true && password.value === confirmPassword.value){
                newUser.toJSON(firstName, lastName, address, phoneNumber, emailAddress, username, password);

                // Add user to session storage
                sessionStorage.setItem("users", newUser.serialize());
                messageArea.removeAttr("class").hide();

                location.href = "../../index.html";
            }else{
                // username exists or passwords don't match
                $("#username").trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text("ERROR: Username Taken or Passwords do not match.").show();
            }
        });
    });
}

/**
 * Displays the login page
 * Authentication if the users Login Credentials are accurate to the data stored
 * Shows error messages if there is an error
 */
function displayLoginPage(){
    console.log("Called Displayed Login Page.");

    let messageArea = $("#messageArea").hide();

    $("#submitButton").on("click", function(){
        let username = document.getElementById("username");
        let password = document.getElementById("password");

        let success = false;
        let newUser = new core.User();

        $.get("../../data/user.json", function(data){
            for(const user of data.users){
                // Check if the username and password
                if(username.value === user.Username && password.value === user.Password){
                    newUser.fromJSON(user);
                    success = true;
                    break;
                }
            }
            if(success === true){
                // Add user to session storage
                localStorage.setItem("users", newUser.serialize());
                messageArea.removeAttr("class").hide();

                // Redirect user to secure area of the site.
                location.href = "../../index.html";
            }else{
                // They do not match
                $("#username").trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text("Error: Invalid Login Credentials").show();
            }
        });
    });

    $("#cancelButton").on("click", function(){
        location.href = "../../index.html";
    });
}

// Gallery Model
// Open the Modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    let captionText = document.getElementById("caption");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
}

// getting feedback asynchronously with Ajax
function AjaxFeedback(){
    let xhr = new XMLHttpRequest();
    let feedback = document.getElementById("feedback")

    xhr.open("GET", "../../views/content/contact.html", true);

    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            if(feedback !== null)
                sessionStorage.setItem("feedback", feedback.value)
            location.href = "../../index.html";
        }
    });

    xhr.send();
}