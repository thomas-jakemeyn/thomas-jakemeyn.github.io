'use strict';

class ProjectViewController {

    constructor($scope, project) {
        this.$scope = $scope;
        this.$scope.project = project;
        this.$scope.isDefined = angular.isDefined;
        this.setUpDragAndDrop();
    }

    setUpDragAndDrop() {
        this.$scope.$on('droppable.over', (event, task, droppable) => {
            droppable.addClass('over');
        });
        this.$scope.$on('droppable.out', (event, task, droppable) => {
            droppable.removeClass('over');
        });
    }
}

export default ['$scope', 'project', ProjectViewController];