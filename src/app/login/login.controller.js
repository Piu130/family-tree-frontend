(function() {
  'use strict';

  angular
    .module('login', [])
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController() {
    var vm = this;

    vm.user = {
      email: '',
      password: '',
      rememberMe: false
    };

    vm.do = function() {
      // do login
    };

  }

})();
