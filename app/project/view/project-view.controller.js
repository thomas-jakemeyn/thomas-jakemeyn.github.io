'use strict';

import angular from 'angular';

class ProjectViewController {

    constructor($scope, $state, $uibModal, projectService, project) {
        this.$scope = $scope;
        this.$uibModal = $uibModal;
        this.projectService = projectService;
        this.project = project;

        $scope.$state = $state;
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
        var dialog = this.$uibModal.open({
            templateUrl: 'app/project/view/actions/create-task/create-task-form.html',
            controller: 'CreateTaskFormController',
            animation: true,
            size: 'lg'
        });

        dialog.result.then(data => {
            return this.projectService.createTask(this.project, data, null, sprintId);
        }).then(task => {
            this.$scope.$broadcast('task-created', task);
            console.log('Task ' + task.id + ' created in sprint ' + sprintId + '.\n' + angular.toJson(this.project.tasks, true));
        });
    }

    completeSprint(sprintId) {
        this.projectService.completeSprint(this.project, sprintId).then(() => {
            this.$scope.$apply();
            console.log('Sprint ' + sprintId + ' completed.\n' + angular.toJson(this.project, true));
        });
    }
}

export default ['$scope', '$state', '$uibModal', 'projectService', 'project', ProjectViewController];