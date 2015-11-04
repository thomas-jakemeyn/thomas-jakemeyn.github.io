'use strict';

import angular from 'angular';

class ProjectBacklogController {

    constructor($scope, projectService, dragulaService) {
        this.$scope = $scope;
        this.project = $scope.project;
        this.projectService = projectService;
        this.dragulaService = dragulaService;
        this.setUpDragAndDrop();
    }

    setUpDragAndDrop() {
        this.$scope.$on('droppable.over', (event, task, droppable) => {
            droppable.addClass('over');
        });
        this.$scope.$on('droppable.out', (event, task, droppable) => {
            droppable.removeClass('over');
        });
        this.$scope.$on('droppable.drop', (event, task, targetSprint, sourceSprint, nextTask) => {
            this.onTaskDropped(task, nextTask, targetSprint);
        });
    }

    onTaskDropped(task, nextTask, sprint) {
        var taskId = task.attr('id');
        var nextTaskId = nextTask ? nextTask.attr('id') : null;
        var sprintId = sprint.attr('id');
        this.projectService.changeTaskPriority(this.project, taskId, nextTaskId, sprintId).then(() => {
            this.$scope.$apply();
            console.log('Task ' + taskId + ' moved to sprint ' + sprintId + ', before task ' + nextTaskId + '.\n'
                    + angular.toJson(this.project.tasks, true));
        });
    }
}

export default ['$scope', 'projectService', 'dragulaService', ProjectBacklogController];