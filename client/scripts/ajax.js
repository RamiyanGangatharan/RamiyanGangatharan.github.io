"use strict";
function AJAX_REQUEST(method, url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (typeof callback == "function") {
                callback(xhr.responseText);
            }
            else {
                console.error("ERROR: CALLBACK NOT A FUNCTION");
            }
        }
    });
    xhr.send();
}
let xhr = new XMLHttpRequest();
let feedback = document.getElementById("feedback");
xhr.open("GET", "../../views/content/contact.html", true);
xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        if (feedback !== null) {
            sessionStorage.setItem("feedback", feedback.value);
        }
        location.href = "../../index.html";
    }
});
xhr.send();
function AjaxFeedback() {
    $('#eventForm').on('submit', function (e) {
        e.preventDefault();
        const eventName = $('#eventName').val();
        const eventDescription = $('#eventDescription').val();
        const eventDate = $('#eventDate').val();
        $.ajax({
            url: 'http://localhost:3000/events',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ eventName, eventDescription, eventDate }),
            success: function (response) {
                console.log('Event submitted', response);
            },
            error: function (xhr, status, error) {
                console.error('Error submitting event', error);
            }
        });
    });
}
//# sourceMappingURL=ajax.js.map