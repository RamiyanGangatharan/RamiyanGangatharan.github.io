export function RegisterFormValidation() {
    ValidateField("#firstName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid First Name.");
    ValidateField("#lastName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid Last Name.");
    ValidateField("#address", /^(?![ -.&,_'":?!/])(?!.*[- &_'":]$)(?!.*[-.#@&,:?!/]{2})[a-zA-Z0-9- .#@&,_'":?!/]+$/, "Please enter a valid Address.");
    ValidateField("#phoneNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid Contact Number.");
    ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address!");
}
const ValidateField = (input_field_id, regular_expression, error_message) => {
    let messageArea = $("#messageArea").hide();
    $(input_field_id).on("blur", function (event) {
        let inputField = $(event.target);
        let inputFieldText = inputField.val();
        if (!regular_expression.test(inputFieldText)) {
            inputField.trigger("focus").trigger("select");
            messageArea.addClass("alert alert-danger").text(error_message).show();
        }
        else {
            messageArea.removeAttr("class").hide();
        }
    });
};
//# sourceMappingURL=formValidation.js.map