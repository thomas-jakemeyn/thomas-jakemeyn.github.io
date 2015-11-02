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
            this.$scope.$on(task.id + '.drop', (event, task, targetLane) => {
                this.onTaskDropped(task, targetLane);
            });
            this.dragulaService.options(this.$scope, task.id, {
                accepts: (task, targetLane, sourceLane) => {
                    return this.isValidTransition(sourceLane, targetLane);
                }
            });
        });
    }

    onTaskDropped(task, lane) {
        var taskId = task.attr('id');
        var stateId = lane.attr('id');
        this.projectService.changeTaskState(this.project, taskId, stateId);
    }

    isValidTransition(sourceLane, targetLane) {
        var sourceStateId = angular.element(sourceLane).attr('id');
        var targetStateId = angular.element(targetLane).attr('id');
        return this.project.flow.transitions[sourceStateId].indexOf(targetStateId) >= 0;
    }
}

export default ['$scope', 'projectService', 'dragulaService', ProjectBoardController];