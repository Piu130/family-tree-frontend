(function () {
  'use strict';

  angular
    .module('login', [])
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(loginService, $state) {
    var vm = this;

    vm.user = {
      email: '',
      password: '',
      rememberMe: false
    };

    vm.do = function () {
      loginService
        .login(vm.user)
        .then(function () {
          $state.go('tree');
        })
        .catch(function (error) {
        });
    };

  }

})();
