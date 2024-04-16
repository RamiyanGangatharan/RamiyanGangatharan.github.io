/**
 * Regular expressions to help validate the register form
 */
export function RegisterFormValidation(): void {
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
        /^(?![ -.&,_'":?!/])(?!.*[- &_'":]$)(?!.*[-.#@&,:?!/]{2})[a-zA-Z0-9- .#@&,_'":?!/]+$/,
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
const ValidateField = (input_field_id: string, regular_expression: RegExp, error_message: string): void => {
    let messageArea = $("#messageArea").hide();

    $(input_field_id).on("blur", function (event) {
        // Use $(event.target) instead of $(this) for better type inference
        let inputField = $(event.target);
        let inputFieldText = inputField.val();
        if (!regular_expression.test(<string>inputFieldText)) {
            inputField.trigger("focus").trigger("select");
            messageArea.addClass("alert alert-danger").text(error_message).show();
        } else {
            // Full name was successful
            messageArea.removeAttr("class").hide();
        }
    });
};
