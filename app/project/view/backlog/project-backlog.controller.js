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
        this.$scope.$on('droppable.drop', (event, task, targetSprint, sourceSprint, beforeTask) => {
            this.onTaskDropped(task, targetSprint, beforeTask);
        });
    }

    onTaskDropped(task, targetSprint, beforeTask) {
        var taskId = task.attr('id');
        var targetSprintId = targetSprint.attr('id');
        var beforeTaskId = beforeTask ? beforeTask.attr('id') : null;
        this.projectService.moveTaskToSprint(this.project, taskId, targetSprintId, beforeTaskId);
    }
}

export default ['$scope', 'projectService', 'dragulaService', ProjectBacklogController];