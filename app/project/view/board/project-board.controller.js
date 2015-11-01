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
        this.project.sprints.forEach(sprint => {
            this.$scope.$on(sprint.id + '.over', (event, task, lane) => {
                lane.addClass('over');
            });
            this.$scope.$on(sprint.id + '.out', (event, task, lane) => {
                lane.removeClass('over');
            });
            this.$scope.$on(sprint.id + '.drop', (event, task, targetLane, sourceLane, beforeTask) => {
                this.onTaskDropped(task, targetLane, sourceLane, beforeTask);
            });
            this.dragulaService.options(this.$scope, sprint.id, {
                accepts: (task, targetLane, sourceLane) => {
                    return this.isValidTransition(sourceLane, targetLane);
                }
            });
        });
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