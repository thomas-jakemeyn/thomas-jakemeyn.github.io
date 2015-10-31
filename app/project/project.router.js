'use strict';

export default function configureRouter($stateProvider) {
    $stateProvider
            .state('projects', {
                url: '/projects',
                templateUrl: 'app/project/projects.html',
                controller: 'ProjectsController',
                resolve: {
                    projects: ['projectService', function (projectService) {
                        return projectService.getProjects();
                    }]
                }
            });
};