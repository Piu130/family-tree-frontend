(function () {
  'use strict';

  angular
    .module('emblem', [])
    .controller('EmblemController', EmblemController);

  /** @ngInject */
  function EmblemController($state) {
    const vm = this;

    vm.fromSlash = $state.params.fromSlash;

    vm.redirect = function () {
      $state.go('tree')
    };
  }

})();
