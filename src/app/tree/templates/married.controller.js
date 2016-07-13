(function () {
  'use strict';

  angular
    .module('married', ['ui.bootstrap'])
    .controller('MarriedController', MarriedController);

  /** @ngInject */
  function MarriedController($uibModalInstance, data, familyMemberObject) {
    const vm = this;

    vm.closeModal = closeModal;
    vm.data = data;

    vm.familyMemberName = familyMemberObject.getNamesAsString(data.familyMember);
    vm.spouseName = familyMemberObject.getNamesAsString(data.spouse);

    function closeModal() {
      $uibModalInstance.close();
    }
  }

})();
