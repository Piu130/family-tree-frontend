(function() {
  'use strict';

  angular
    .module('married', ['ui.bootstrap'])
    .controller('MarriedController', MarriedController);

  /** @ngInject */
  function MarriedController($scope, $uibModalInstance, data, familyMemberRepository) {
    $scope.data = data;

    $scope.familyMemberName = familyMemberRepository.getNamesAsString(data.familyMember);
    $scope.spouseName = familyMemberRepository.getNamesAsString(data.spouse);

    $scope.closeModal = function() {
      $uibModalInstance.close();
    };
  }

})();
