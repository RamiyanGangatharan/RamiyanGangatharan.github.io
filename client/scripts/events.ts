export function processEventsData(responseText: string) {
    const data = JSON.parse(responseText);
    const events = data.event;
    const eventsContainer: HTMLElement | null = document.getElementById('events-container');

    if (eventsContainer) {
        eventsContainer.innerHTML = '';

        events.forEach((event: { imageUrl: string; title: string; description: string; }): void => {
            let eventElement = document.createElement('div');
            eventElement.className = 'col-md-4 mb-4';
            eventElement.innerHTML = `
                <div class="card">
                    <img src="${event.imageUrl}" class="card-img-top" alt="${event.title}">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <p class="card-text">${event.description}</p>
                    </div>
                </div>`;
            eventsContainer.appendChild(eventElement);
        });
    } else {
        console.warn('The events container element was not found in the document.');
    }
}

// Function to fetch events data
export function fetchEventsData() {
    AJAX_REQUEST('GET', '../../data/events.json', processEventsData);
}