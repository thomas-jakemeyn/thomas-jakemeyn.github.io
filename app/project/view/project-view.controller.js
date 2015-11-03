'use strict';

class ProjectViewController {

    constructor($scope, projectService, project) {
        this.$scope = $scope;
        this.projectService = projectService;
        this.project = project;

        $scope.project = project;
        $scope.getTasksOfBacklog = () => this.getTasksOfBacklog();
        $scope.getTasksOfSprint = (sprintId) => this.getTasksOfSprint(sprintId);
        $scope.createTask = (sprintId) => this.createTask(sprintId);
    }

    getTasksOfBacklog() {
        return this.projectService.getTasksOfBacklog(this.project);
    }

    getTasksOfSprint(sprintId) {
        return this.projectService.getTasksOfSprint(this.project, sprintId);
    }

    createTask(sprintId) {
        this.projectService.createTask(this.project, {
            title: 'This is a test story!'
        }, null, sprintId);
    }
}

export default ['$scope', 'projectService', 'project', ProjectViewController];