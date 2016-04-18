(function () {
  'use strict';

  angular
    .module('married', ['ui.bootstrap'])
    .controller('MarriedController', MarriedController);

  /** @ngInject */
  function MarriedController($uibModalInstance, data, familyMemberRepository) {
    var vm = this;

    vm.data = data;

    vm.familyMemberName = familyMemberRepository.getNamesAsString(data.familyMember);
    vm.spouseName = familyMemberRepository.getNamesAsString(data.spouse);

    vm.closeModal = function () {
      $uibModalInstance.close();
    };
  }

})();
