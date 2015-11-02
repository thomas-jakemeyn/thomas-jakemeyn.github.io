'use strict';

import angular from 'angular';

class ProjectViewController {

    constructor($scope, projectService, project) {
        this.$scope = $scope;
        this.projectService = projectService;
        this.project = project;

        $scope.project = project;
        $scope.isDefined = angular.isDefined;
        $scope.createTaskInBacklog = () => {
            this.createTaskInBacklog();
        };
    }

    createTaskInBacklog() {
        this.projectService.createTaskInBacklog(this.project, {
            title: 'This is a test story!'
        });
    }
}

export default ['$scope', 'projectService', 'project', ProjectViewController];