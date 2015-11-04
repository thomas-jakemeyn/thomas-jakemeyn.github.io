'use strict';

class ProjectViewController {

    constructor($scope, projectService, project) {
        this.$scope = $scope;
        this.projectService = projectService;
        this.project = project;

        $scope.project = project;
        $scope.getTasksOfBacklog = () => this.getTasksOfBacklog();
        $scope.getTasksOfSprint = sprintId => this.getTasksOfSprint(sprintId);
        $scope.createTask = sprintId => this.createTask(sprintId);
        $scope.completeSprint = sprintId => this.completeSprint(sprintId);
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
        });
    }

    completeSprint(sprintId) {
        this.projectService.completeSprint(this.project, sprintId);
    }
}

export default ['$scope', 'projectService', 'project', ProjectViewController];