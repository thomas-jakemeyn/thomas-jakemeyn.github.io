'use strict';

import angular from 'angular';

class ProjectBoardController {

    constructor($scope, projectService, dragulaService) {
        this.$scope = $scope;
        this.projectService = projectService;
        this.dragulaService = dragulaService;
        this.setUpDragAndDrop();
    }

    setUpDragAndDrop() {
        this.$scope.$on('lane.over', this.onLaneHovered);
        this.$scope.$on('lane.out', this.onLaneExited);
        this.$scope.$on('lane.drop', this.onTaskDropped);
        this.dragulaService.options(this.$scope, 'lane', {
            accepts: this.canTaskBeDropped
        });
    }

    onLaneHovered(event, task, lane) {
        lane.addClass('over');
    }

    onLaneExited(event, task, lane) {
        lane.removeClass('over');
    }

    onTaskDropped(event, task, targetLane, sourceLane, beforeTask) {
        var taskId = task.attr('id');
        var sourceLaneId = sourceLane.attr('id');
        var targetLaneId = targetLane.attr('id');
        var beforeTaskId = beforeTask ? beforeTask.attr('id') : null;
        console.log('Moved task ' + taskId + ' from lane ' + sourceLaneId + ' to lane ' + targetLaneId);
    }

    canTaskBeDropped(task, targetLane, sourceLane) {
        var taskId = angular.element(task).attr('id');
        var sourceLaneId = angular.element(sourceLane).attr('id');
        var targetLaneId = angular.element(targetLane).attr('id');
        console.log('Task ' + taskId + ' can be dropped from lane ' + sourceLaneId + ' to lane ' + targetLaneId);
        return true;
    }
}

export default ['$scope', 'projectService', 'dragulaService', ProjectBoardController];