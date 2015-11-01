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
        this.$scope.$on('droppable.drop', (event, task, targetSprint, sourceSprint, beforeTask) => {
            this.onTaskDropped(task, targetSprint, beforeTask);
        });
        this.dragulaService.options(this.$scope, 'droppable', {
            invalid: function (element) {
                return !element.classList.contains('draggable');
            }
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