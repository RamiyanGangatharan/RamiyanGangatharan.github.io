document.addEventListener('DOMContentLoaded', function (): void {
    const projectsContainer: HTMLElement = document.getElementById('projects-container')!;
    const loadMoreButton: HTMLElement | null = document.getElementById('loadMore')!;


    let projects: { imageUrl: string; description: string; title: string }[];

    projects = [{
        title: 'Project One',
        description: 'A brief description of Project One.',
        imageUrl: "../../Images/NY-SKYLINE.webp"
    },
        {
            title: 'Project Two',
            description: 'A brief description of Project Two.',
            imageUrl: "../../Images/YYZ-SKYLINE.webp"
        },
        {
            title: 'Project Three',
            description: 'A brief description of Project Three.',
            imageUrl: "../../Images/england_skyline.jpg"
        },
        {
            title: 'Project Four',
            description: 'A brief description of Project Four.',
            imageUrl: "../../Images/PWC_OFFICE.webp"
        },
        {
            title: 'Project Five',
            description: 'A brief description of Project Five.',
            imageUrl: "../../Images/cup-team-photo-2023-2.png"
        },
        {
            title: 'Project Six',
            description: 'A brief description of Project Six.',
            imageUrl: "../../Images/CVPRW2023_EventVision_group_picture.jpg"
        }
    ];

    /**
     * Creates an HTML card element containing project details.
     * @param {Object} project - The project data.
     * @param {string} project.title - The title of the project.
     * @param {string} project.description - A brief description of the project.
     * @param {string} project.imageUrl - The URL of the project's image.
     * @returns {HTMLElement} The project card element.
     */
    function createProjectCard(project: { title: string; description: string; imageUrl: string; }): HTMLElement {
        let card: HTMLDivElement = document.createElement('div');
        card.className = 'col-lg-4 col-md-6 mb-4';
        card.innerHTML = `
            <div class="card h-100">
                <img style="margin-top: 15px; height: 250px" 
                    src="${project.imageUrl}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                </div>
            </div>
        `;
        return card;
    }

    /**
     * Loads a specified number of projects from the projects array and appends them to the projects' container.
     * If there are no more projects to load, disables the 'Load More' button.
     * @param {number} [numProjects=3] - The number of projects to load each time the function is called.
     */
    function loadProjects(numProjects: number = 3): void {
        let projectsToLoad: {
            imageUrl: string;
            description: string;
            title: string
        }[] = projects.splice(0, numProjects);
        projectsToLoad.forEach((project: { imageUrl: string; description: string; title: string }): void => {
            projectsContainer.appendChild(createProjectCard(project));
        });
        if (projects.length === 0) {
            if (loadMoreButton instanceof HTMLButtonElement) {
                loadMoreButton.disabled = true;
            }
        }
    }


    // Initial load of projects
    loadProjects();

    // Event listener for 'Load More' button
    loadMoreButton.addEventListener('click', function () {
        loadProjects();
    });
});