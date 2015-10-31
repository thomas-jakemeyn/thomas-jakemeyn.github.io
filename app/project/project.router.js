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
            })
            .state('project-view', {
                url: '/projects/:projectId',
                templateUrl: 'app/project/project-view.html',
                controller: 'ProjectViewController',
                resolve: {
                    project: ['projectService', '$stateParams', function (projectService, $stateParams) {
                        return projectService.getProject($stateParams.projectId);
                    }]
                }
            });
};