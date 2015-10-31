'use strict';

class ProjectViewController {

    constructor($scope, $state, project) {
        $scope.project = project;
        $scope.isNumber = angular.isNumber;
    }
}

export default ['$scope', '$state', 'project', ProjectViewController];