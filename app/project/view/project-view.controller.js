'use strict';

class ProjectViewController {

    constructor($scope, $state, project) {
        $scope.project = project;
        $scope.isDefined = angular.isDefined;
    }
}

export default ['$scope', '$state', 'project', ProjectViewController];