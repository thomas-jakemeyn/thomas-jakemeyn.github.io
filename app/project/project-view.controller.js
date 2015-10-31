'use strict';

class ProjectViewController {

    constructor($scope, project) {
        $scope.project = project;
    }
}

export default ['$scope', 'project', ProjectViewController];