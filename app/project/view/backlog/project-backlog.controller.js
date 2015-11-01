'use strict';

import angular from 'angular';

class ProjectBacklogController {

    constructor($scope, dragulaService) {
        this.$scope = $scope;
        this.dragulaService = dragulaService;
        this.setUpDragAndDrop();
    }

    setUpDragAndDrop() {
        this.$scope.$on('droppable.drop', (event, task, targetSprint, sourceSprint, beforeTask) => {
            this.onTaskDropped(task, targetSprint, sourceSprint, beforeTask);
        });
        this.dragulaService.options(this.$scope, 'droppable', {
            invalid: function (element) {
                return !element.classList.contains('draggable');
            }
        });
    }

    onTaskDropped(task, targetSprint, sourceSprint, beforeTask) {
        var taskId = task.attr('id');
        var sourceSprintId = sourceSprint.attr('id');
        var targetSprintId = targetSprint.attr('id');
        var beforeTaskId = beforeTask ? beforeTask.attr('id') : null;
        console.log('Moved task ' + taskId + ' from sprint ' + sourceSprintId + ' to sprint ' + targetSprintId);
    }
}

export default ['$scope', 'dragulaService', ProjectBacklogController];