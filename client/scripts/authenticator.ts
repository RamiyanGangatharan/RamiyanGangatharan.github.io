import {RegisterFormValidation} from "./formValidation.js";

/**
 * Checks if a user is logged in
 * @constructor
 */
export function CheckLogin(): void {
    if (localStorage.length > 0) {
        $("#login").html(`<a id="logout" class="nav-link" href="#">
                <i class="fas fa-sign-out-alt"></i> Logout</a>`);

        let keys = Object.keys(localStorage);

        // Writes the users name if they are logged in on the homepage
        for (const key of keys) {
            if (key === "users") {
                let userData = localStorage.getItem(key);
                // Check if userData is not null before proceeding
                if (userData !== null) {
                    let usersName = userData.split(",");
                    $("#name").html(`<h1 id="name">Welcome ${usersName[0]} to The Harmony Hub</h1>`);
                }
            }
        }
    }

    $("#logout").on("click", function (): void {
        // Perform Logout
        localStorage.clear();

        // Redirect to login.html page
        location.href = "login.html";
    });
}

/**
 * The Register Page
 * When the form is submitted after validation, will check if username already exists,
 * and if the passwords are the same.
 */
export function displayRegisterPage(): void {
    console.log("Called RegisterPage");

    RegisterFormValidation();

    $("#sendButton").on("click", function (): void {
        // Typecast each element to HTMLInputElement to access the value property
        let firstName = document.getElementById("firstName") as HTMLInputElement;
        let lastName = document.getElementById("lastName") as HTMLInputElement;
        let address = document.getElementById("address") as HTMLInputElement;
        let phoneNumber = document.getElementById("phoneNumber") as HTMLInputElement;
        let emailAddress = document.getElementById("emailAddress") as HTMLInputElement;
        let username = document.getElementById("username") as HTMLInputElement;
        let password = document.getElementById("password") as HTMLInputElement;
        let confirmPassword = document.getElementById("confirmPassword") as HTMLInputElement;

        let success: boolean = true;
        // Assuming newUser and core.User exist and are correctly implemented
        let newUser = new core.User();
        let messageArea = $("#messageArea").hide();

        $.get("../../data/user.json", function (data: { users: any; }): void {
            for (const user of data.users) {
                if (username.value === user.Username) {
                    success = false;
                    break;
                }
            }
            if (success && password.value === confirmPassword.value) {
                // Assuming toJSON is correctly implemented and can handle HTMLInputElement types
                newUser.toJSON(firstName.value, lastName.value, address.value, phoneNumber.value, emailAddress.value, username.value, password.value);

                // Assuming serialize is correctly implemented
                sessionStorage.setItem("users", <string>newUser.serialize());
                messageArea.removeClass("alert alert-danger").hide();

                location.href = "../../index.html";
            } else {
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
export function displayLoginPage() {
    console.log("Called Displayed Login Page.");

    let messageArea = $("#messageArea").hide();

    $("#submitButton").on("click", function () {
        // Correctly cast elements to HTMLInputElement
        let username = document.getElementById("username") as HTMLInputElement;
        let password = document.getElementById("password") as HTMLInputElement;

        // It's safe to assume newUser and core.User are properly defined elsewhere
        let success = false;
        let newUser = new core.User();

        $.get("../../data/user.json", function (data: { users: any; }) {
            // Check if the fetched users array is not empty and elements are not null
            if (username && password) {
                for (const user of data.users) {
                    // Now safely use the value property
                    if (username.value === user.Username && password.value === user.Password) {
                        newUser.fromJSON(user); // Assuming fromJSON is a method of newUser
                        success = true;
                        break;
                    }
                }
                if (success) {
                    // Assuming serialize is a method of newUser
                    localStorage.setItem("users", <string>newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "../../index.html";
                } else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Login Credentials").show();
                }
            }
        });
    });

    $("#cancelButton").on("click", function (): void {
        location.href = "../../index.html";
    });
}