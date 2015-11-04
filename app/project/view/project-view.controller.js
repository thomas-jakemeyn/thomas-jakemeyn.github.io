'use strict';

import angular from 'angular';

class ProjectViewController {

    constructor($scope, projectService, project) {
        this.$scope = $scope;
        this.projectService = projectService;
        this.project = project;

        $scope.project = project;
        $scope.getSprints = () => this.getSprints();
        $scope.getTasksOfBacklog = () => this.getTasksOfBacklog();
        $scope.getTasksOfSprint = sprintId => this.getTasksOfSprint(sprintId);
        $scope.createTask = sprintId => this.createTask(sprintId);
        $scope.completeSprint = sprintId => this.completeSprint(sprintId);
    }

    getSprints() {
        return this.projectService.getSprints(this.project);
    }

    getTasksOfBacklog() {
        return this.projectService.getTasksOfBacklog(this.project);
    }

    getTasksOfSprint(sprintId) {
        return this.projectService.getTasksOfSprint(this.project, sprintId);
    }

    createTask(sprintId) {
        var data = {
            title: 'This is a test story!'
        };
        this.projectService.createTask(this.project, data, null, sprintId).then(task => {
            this.$scope.$broadcast('task-created', task);
            console.log('Task ' + task.id + ' created in sprint ' + sprintId + '.\n' + angular.toJson(this.project.tasks, true));
        });
    }

    completeSprint(sprintId) {
        this.projectService.completeSprint(this.project, sprintId).then(() => {
            console.log('Sprint ' + sprintId + ' completed.\n' + angular.toJson(this.project, true));
        });
    }
}

export default ['$scope', 'projectService', 'project', ProjectViewController];