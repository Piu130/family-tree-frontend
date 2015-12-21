(function() {
  'use strict';

  angular
    .module('married', [])
    .controller('MarriedController', MarriedController);

  /** @ngInject */
  function MarriedController($scope, $uibModalInstance, ids) {
    console.log(ids);
    $uibModalInstance.close($scope.selected.item);
  }

})();
