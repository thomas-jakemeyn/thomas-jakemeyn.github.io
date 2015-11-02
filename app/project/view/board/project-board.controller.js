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
        this.project.backlog.forEach(task => {
            this.$scope.$on(task.id + '.over', (event, task, lane) => {
                lane.addClass('over');
            });
            this.$scope.$on(task.id + '.out', (event, task, lane) => {
                lane.removeClass('over');
            });
            this.$scope.$on(task.id + '.drop', (event, task, targetLane, sourceLane, beforeTask) => {
                this.onTaskDropped(task, targetLane, beforeTask);
            });
            this.dragulaService.options(this.$scope, task.id, {
                accepts: (task, targetLane, sourceLane) => {
                    return this.isValidTransition(sourceLane, targetLane);
                }
            });
        });
    }

    onTaskDropped(task, targetLane, beforeTask) {
        var taskId = task.attr('id');
        var stateId = targetLane.attr('id');
        var beforeTaskId = beforeTask ? beforeTask.attr('id') : null;
        this.projectService.moveTaskToState(this.project, taskId, stateId, beforeTaskId);
    }

    isValidTransition(sourceLane, targetLane) {
        var sourceStateId = angular.element(sourceLane).attr('id');
        var targetStateId = angular.element(targetLane).attr('id');
        return this.project.flow.transitions[sourceStateId].indexOf(targetStateId) >= 0;
    }
}

export default ['$scope', 'projectService', 'dragulaService', ProjectBoardController];