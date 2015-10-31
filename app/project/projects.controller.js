'use strict';

class ProjectsController {

    constructor($scope, projects) {
        $scope.projects = projects;
    }
}

export default ['$scope', 'projects', ProjectsController];