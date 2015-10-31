'use strict';

export default function ($stateProvider) {
    $stateProvider
            .state('project-list', {
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