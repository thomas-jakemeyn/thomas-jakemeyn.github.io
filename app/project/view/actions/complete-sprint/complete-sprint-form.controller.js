'use strict';

class CompleteSprintFormController {

    constructor($scope, $uibModalInstance) {
        this.$uibModalInstance = $uibModalInstance;

        $scope.ok = () => this.ok();
        $scope.cancel = () => this.cancel();
    }

    ok() {
        this.$uibModalInstance.close();
    }

    cancel() {
        this.$uibModalInstance.dismiss('cancel');
    }
}

export default ['$scope', '$uibModalInstance', CompleteSprintFormController];