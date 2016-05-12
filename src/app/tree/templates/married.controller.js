(function () {
  'use strict';

  angular
    .module('married', ['ui.bootstrap'])
    .controller('MarriedController', MarriedController);

  /** @ngInject */
  function MarriedController($uibModalInstance, data, familyMemberRepository) {
    const vm = this;

    vm.closeModal = closeModal;
    vm.data = data;

    vm.familyMemberName = familyMemberRepository.getNamesAsString(data.familyMember);
    vm.spouseName = familyMemberRepository.getNamesAsString(data.spouse);

    function closeModal() {
      $uibModalInstance.close();
    }
  }

})();
