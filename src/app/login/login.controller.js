(function () {
  'use strict';

  angular
    .module('login', [])
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController(loginService, $state, growl) {
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
          growl.error('Loginfehler. Email oder Passwort falsch.', {
            ttl: 3000,
            disableCountDown: true,
            disableIcons: true
          });
        });
    };

  }

})();
