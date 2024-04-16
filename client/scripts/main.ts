/**
 * @author: Ramiyan Gangatharan
 * Student ID: 100835223
 * @date: January 27, 2024
 */

/**
 * Main application script containing multiple functionalities like initializing carousels,
 * loading dynamic content, handling modals, validating forms, and more.
 * @author: Various contributors including Ramiyan Gangatharan and Joy Tejada.
 * Dates of contribution are marked at relevant sections.
 */

"use strict";

import {fetchEventsData} from "./events.js";
import {fetchFactOfTheDay, loadFooter, loadHeader} from "./contentLoaders.js";
import {initializeCarousel} from "./carousel.js";
import {CheckLogin, displayLoginPage, displayRegisterPage} from "./authenticator.js";

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    initializeCarousel();
    fetchFactOfTheDay();
    CheckLogin();

    // Switch or if-else conditions to call page-specific functions
    // based on the title or other conditions
    switch (document.title) {
        case 'Team':
            displayModal();
            break;
        case 'Register':
            displayRegisterPage();
            break;
        case 'Login':
            displayLoginPage();
            break;
    }
    fetchEventsData();
});