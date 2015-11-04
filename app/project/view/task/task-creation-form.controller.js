'use strict';

class TaskCreationFormController {

    constructor($scope, $uibModalInstance) {
        this.$scope = $scope;
        this.$uibModalInstance = $uibModalInstance;

        $scope.data = {};
        $scope.ok = () => this.ok();
        $scope.cancel = () => this.cancel();
    }

    ok() {
        this.$uibModalInstance.close(this.$scope.data);
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}

export default ['$scope', '$uibModalInstance', TaskCreationFormController];