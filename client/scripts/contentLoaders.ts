// Function to load the header dynamically
export function loadHeader(): void {
    fetch('server/views/components/header.html') // Use root-relative path
        .then(response => response.text())
        .then(html => {
            let headerElement: HTMLElement | null;
            headerElement = document.getElementById('site-header');
            if (headerElement !== null) {
                headerElement.innerHTML = html;
            } else {
                console.warn('The header element was not found in the document.');
            }
        })
        .catch(error => {
            console.warn('Error loading the header:', error);
        });
}

// Function to load the footer dynamically
export function loadFooter(): void {
    fetch('server/views/components/footer.html') // Use root-relative path
        .then(response => response.text())
        .then(html => {
            let footerElement: HTMLElement | null;
            footerElement = document.getElementById('site-footer');
            if (footerElement !== null) {
                footerElement.innerHTML = html;
            } else {
                console.warn('The footer element was not found in the document.');
            }
        })
        .catch(error => {
            console.warn('Error loading the footer:', error);
        });
}

export function fetchFactOfTheDay(): void {
    const limit: 1 = 1;
    const apiKey: string = 'NhKexKzfF0TmdyXL/Jj/0Q==MMvyNrvqLLVQWkS2'; // Reminder: It's best practice to keep API keys hidden, not in front-end code

    $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/facts?limit=${limit}`,
        headers: {'X-Api-Key': apiKey},
        contentType: 'application/json',
        success: function (result: any[]): void { // Temporarily accept any[] until we verify the structure
            console.log(result);

            // Use a type assertion to tell TypeScript what structure we're expecting
            const facts: FactApiResponse[] = result as FactApiResponse[];

            if (facts.length > 0) {
                $('#fact-of-the-day').text(facts[0].fact);
            } else {
                console.error('Unexpected result structure:', result);
            }
        },
        error: function (jqXHR: { responseText: any; }): void {
            console.error('Error fetching fact of the day:', jqXHR.responseText || 'Unknown error');
        }
    });
}

export interface FactApiResponse {
    fact: string;
}
