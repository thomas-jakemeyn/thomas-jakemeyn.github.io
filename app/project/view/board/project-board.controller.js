'use strict';

class ProjectBoardController {

    constructor($scope, projectService) {
        this.projectService = projectService;
        $scope.$on('lane.over', this.onLaneHovered);
        $scope.$on('lane.out', this.onLaneExited);
        $scope.$on('lane.drop', this.onTaskDropped);
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
}

export default ['$scope', 'projectService', ProjectBoardController];