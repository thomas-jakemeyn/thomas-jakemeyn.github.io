'use strict';

export default function ($stateProvider) {
    $stateProvider
            .state('projects', {
                url: '/projects',
                templateUrl: 'app/project/project-list.html',
                controller: 'ProjectListController',
                resolve: {
                    projects: ['projectService', function (projectService) {
                        return projectService.getProjects();
                    }]
                }
            });
};