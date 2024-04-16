/**
 * Created by Ramiyan Gangatharan
 * @param method
 * @param url
 * @param callback
 * @constructor
 */
function AJAX_REQUEST(method: string, url: string | URL, callback: {
    (responseText: any): void;
    (arg0: string): void;
}): void {
    // Step 1:instantiate new XHR object
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    // Step 2: open XHR request
    xhr.open(method, url);

    // Step 4: Add event listener for the readystatechange event
    // This event is triggered when the state of a document being fetched changes
    xhr.addEventListener("readystatechange", (): void => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (typeof callback == "function") {
                callback(xhr.responseText);
            } else {
                console.error("ERROR: CALLBACK NOT A FUNCTION");
            }
        }
    });

    // Step 3: send XHR request
    xhr.send();
}


let xhr: XMLHttpRequest = new XMLHttpRequest();
// Assuming 'feedback' is a form input or textarea, cast it accordingly.
let feedback: HTMLInputElement | HTMLTextAreaElement | null = document.getElementById("feedback") as HTMLInputElement | HTMLTextAreaElement | null;

xhr.open("GET", "../../views/content/contact.html", true);

xhr.addEventListener("readystatechange", (): void => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        // Check if 'feedback' is not null and has a 'value' property before using it.
        if (feedback !== null) {
            sessionStorage.setItem("feedback", feedback.value);
        }
        location.href = "../../index.html";
    }
});
xhr.send();

// getting feedback asynchronously with Ajax
function AjaxFeedback(): void {

    $('#eventForm').on('submit', function (e) {
        e.preventDefault();
        const eventName = $('#eventName').val();
        const eventDescription = $('#eventDescription').val();
        const eventDate = $('#eventDate').val();

        // AJAX request to server
        $.ajax({
            url: 'http://localhost:3000/events',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({eventName, eventDescription, eventDate}),
            success: function (response) {
                console.log('Event submitted', response);
                // Reload or update UI here
            },
            error: function (xhr, status, error) {
                console.error('Error submitting event', error);
            }
        });
    })
}