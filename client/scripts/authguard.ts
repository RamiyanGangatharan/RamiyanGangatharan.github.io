"use strict";

(function () {
    let protected_routes = ["statistics"];

    // @ts-ignore
    if (protected_routes.indexOf(router.LinkData) > -1) {
        if (!sessionStorage.getItem("users")) {
            location.href = "/login";
        }
    }
})();