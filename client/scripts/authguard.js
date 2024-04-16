"use strict";
(function () {
    let protected_routes = ["statistics"];
    if (protected_routes.indexOf(router.LinkData) > -1) {
        if (!sessionStorage.getItem("users")) {
            location.href = "/login";
        }
    }
})();
//# sourceMappingURL=authguard.js.map