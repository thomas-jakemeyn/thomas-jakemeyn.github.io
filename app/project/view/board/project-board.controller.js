'use strict';

class ProjectBoardController {

    constructor($scope) {
        $scope.$on('lane.over', function (e, task, lane) {
            lane.addClass('over');
        });
        $scope.$on('lane.out', function (e, task, lane) {
            lane.removeClass('over');
        });
    }
}

export default ['$scope', ProjectBoardController];