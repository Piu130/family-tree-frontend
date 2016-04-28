(function () {
  'use strict';

  angular
    .module('login', [])
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($translate, $state, growl, loginService) {
    const vm = this;

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
        .catch(function () {
          growl.error($translate.instant('LOGIN.WRONG_LOGIN_DATA'), {
            ttl: 3000,
            disableCountDown: true,
            disableIcons: true
          });
        });
    };

  }

})();
