'use strict';

class ProjectBoardController {

    constructor($scope) {
        $scope.$on('lane.over', this.onLaneHovered);
        $scope.$on('lane.out', this.onLaneExited);
    }

    onLaneHovered(event, task, lane) {
        lane.addClass('over');
    }

    onLaneExited(event, task, lane) {
        lane.removeClass('over');
    }
}

export default ['$scope', ProjectBoardController];