'use strict';

class ProjectViewController {

    constructor($scope, project) {
        $scope.project = project;
        $scope.isDefined = angular.isDefined;
    }
}

export default ['$scope', 'project', ProjectViewController];