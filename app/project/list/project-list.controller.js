'use strict';

class ProjectListController {

    constructor($scope, projects) {
        $scope.projects = projects;
    }
}

export default ['$scope', 'projects', ProjectListController];