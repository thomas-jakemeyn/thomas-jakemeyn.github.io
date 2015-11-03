'use strict';

import angular from 'angular';

class ProjectViewController {

    constructor($scope, projectService, project) {
        this.$scope = $scope;
        this.projectService = projectService;
        this.project = project;

        $scope.project = project;
        $scope.isDefined = angular.isDefined;
        $scope.createTask = (sprintId) => {
            this.createTask(sprintId);
        };
    }

    createTask(sprintId) {
        this.projectService.createTask(this.project, {
            title: 'This is a test story!'
        }, null, sprintId);
    }
}

export default ['$scope', 'projectService', 'project', ProjectViewController];