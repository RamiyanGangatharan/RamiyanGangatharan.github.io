import { RegisterFormValidation } from "./formValidation.js";
export function CheckLogin() {
    if (localStorage.length > 0) {
        $("#login").html(`<a id="logout" class="nav-link" href="#">
                <i class="fas fa-sign-out-alt"></i> Logout</a>`);
        let keys = Object.keys(localStorage);
        for (const key of keys) {
            if (key === "users") {
                let userData = localStorage.getItem(key);
                if (userData !== null) {
                    let usersName = userData.split(",");
                    $("#name").html(`<h1 id="name">Welcome ${usersName[0]} to The Harmony Hub</h1>`);
                }
            }
        }
    }
    $("#logout").on("click", function () {
        localStorage.clear();
        location.href = "login.html";
    });
}
export function displayRegisterPage() {
    console.log("Called RegisterPage");
    RegisterFormValidation();
    $("#sendButton").on("click", function () {
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
        $.get("../../data/user.json", function (data) {
            for (const user of data.users) {
                if (username.value === user.Username) {
                    success = false;
                    break;
                }
            }
            if (success && password.value === confirmPassword.value) {
                newUser.toJSON(firstName.value, lastName.value, address.value, phoneNumber.value, emailAddress.value, username.value, password.value);
                sessionStorage.setItem("users", newUser.serialize());
                messageArea.removeClass("alert alert-danger").hide();
                location.href = "../../index.html";
            }
            else {
                $("#username").trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text("ERROR: Username Taken or Passwords do not match.").show();
            }
        });
    });
}
export function displayLoginPage() {
    console.log("Called Displayed Login Page.");
    let messageArea = $("#messageArea").hide();
    $("#submitButton").on("click", function () {
        let username = document.getElementById("username");
        let password = document.getElementById("password");
        let success = false;
        let newUser = new core.User();
        $.get("../../data/user.json", function (data) {
            if (username && password) {
                for (const user of data.users) {
                    if (username.value === user.Username && password.value === user.Password) {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                if (success) {
                    localStorage.setItem("users", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "../../index.html";
                }
                else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Login Credentials").show();
                }
            }
        });
    });
    $("#cancelButton").on("click", function () {
        location.href = "../../index.html";
    });
}
//# sourceMappingURL=authenticator.js.map