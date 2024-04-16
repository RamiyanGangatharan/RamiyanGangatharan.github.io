"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const projectsContainer = document.getElementById('projects-container');
    const loadMoreButton = document.getElementById('loadMore');
    let projects;
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
    function createProjectCard(project) {
        let card = document.createElement('div');
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
    function loadProjects(numProjects = 3) {
        let projectsToLoad = projects.splice(0, numProjects);
        projectsToLoad.forEach((project) => {
            projectsContainer.appendChild(createProjectCard(project));
        });
        if (projects.length === 0) {
            if (loadMoreButton instanceof HTMLButtonElement) {
                loadMoreButton.disabled = true;
            }
        }
    }
    loadProjects();
    loadMoreButton.addEventListener('click', function () {
        loadProjects();
    });
});
//# sourceMappingURL=portfolio.js.map