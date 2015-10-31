'use strict';

class ProjectViewController {

    constructor($scope, project) {
        $scope.project = project;
        $scope.isNumber = angular.isNumber;
    }
}

export default ['$scope', 'project', ProjectViewController];