'use strict';

class ProjectsController {

    constructor($scope, projects) {
        this.$scope = $scope;
        this.projects = projects;
        console.log(projects);
    }
}

export default ['$scope', 'projects', ProjectsController];