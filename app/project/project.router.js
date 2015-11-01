'use strict';

export default function ($stateProvider) {
    $stateProvider
            .state('project-list', {
                url: '/projects',
                templateUrl: 'app/project/list/project-list.html',
                controller: 'ProjectListController',
                resolve: {
                    projects: ['projectService', function (projectService) {
                        return projectService.getProjects();
                    }]
                }
            })
            .state('project-view', {
                abstract: true,
                url: '/projects/:projectId',
                templateUrl: 'app/project/view/project-view.html',
                controller: 'ProjectViewController',
                resolve: {
                    project: ['projectService', '$stateParams', function (projectService, $stateParams) {
                        return projectService.getProject($stateParams.projectId);
                    }]
                }
            })
            .state('project-backlog', {
                url: '/backlog',
                parent: 'project-view',
                templateUrl: 'app/project/view/backlog/project-backlog.html',
                controller: 'ProjectBacklogController'
            })
            .state('project-board', {
                url: '/board',
                parent: 'project-view',
                templateUrl: 'app/project/view/board/project-board.html',
                controller: 'ProjectBoardController'
            });
};