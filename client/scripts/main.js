"use strict";
import { fetchEventsData } from "./events.js";
import { fetchFactOfTheDay, loadFooter, loadHeader } from "./contentLoaders.js";
import { initializeCarousel } from "./carousel.js";
import { CheckLogin, displayLoginPage, displayRegisterPage } from "./authenticator.js";
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    initializeCarousel();
    fetchFactOfTheDay();
    CheckLogin();
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
//# sourceMappingURL=main.js.map