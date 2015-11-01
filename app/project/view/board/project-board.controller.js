'use strict';

import angular from 'angular';

class ProjectBoardController {

    constructor($scope, projectService, dragulaService) {
        this.$scope = $scope;
        this.project = $scope.project;
        this.projectService = projectService;
        this.dragulaService = dragulaService;
        this.setUpDragAndDrop();
    }

    setUpDragAndDrop() {
        this.$scope.$on('lane.over', (event, task, lane) => {
            this.onLaneHovered(lane);
        });
        this.$scope.$on('lane.out', (event, task, lane) => {
            this.onLaneExited(lane);
        });
        this.$scope.$on('lane.drop', (event, task, targetLane, sourceLane, beforeTask) => {
            this.onTaskDropped(task, targetLane, sourceLane, beforeTask);
        });
        this.dragulaService.options(this.$scope, 'lane', {
            accepts: (task, targetLane, sourceLane) => {
                return this.isValidTransition(sourceLane, targetLane);
            }
        });
    }

    onLaneHovered(lane) {
        lane.addClass('over');
    }

    onLaneExited(lane) {
        lane.removeClass('over');
    }

    onTaskDropped(task, targetLane, sourceLane, beforeTask) {
        var taskId = task.attr('id');
        var sourceLaneId = sourceLane.attr('id');
        var targetLaneId = targetLane.attr('id');
        var beforeTaskId = beforeTask ? beforeTask.attr('id') : null;
        console.log('Moved task ' + taskId + ' from lane ' + sourceLaneId + ' to lane ' + targetLaneId);
    }

    isValidTransition(sourceLane, targetLane) {
        var sourceLaneId = angular.element(sourceLane).attr('id');
        var targetLaneId = angular.element(targetLane).attr('id');
        return this.project.flow.transitions[sourceLaneId].indexOf(targetLaneId) >= 0;
    }
}

export default ['$scope', 'projectService', 'dragulaService', ProjectBoardController];