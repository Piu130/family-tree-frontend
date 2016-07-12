(function () {
  'use strict';

  angular
    .module('login', [])
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($translate, $state, $stateParams, growl, loginService) {
    const vm = this;

    vm.execute = execute;
    vm.user = {
      email: '',
      password: '',
      rememberMe: false
    };

    function execute() {
      loginService
        .login(vm.user)
        .then(function () {
          const nextState = $stateParams.toState.name ? $stateParams.toState.name : 'tree';

          $state.go(nextState, $stateParams.toParams);
        })
        .catch(function () {
          growl.error($translate.instant('LOGIN.WRONG_LOGIN_DATA'), {
            ttl: 3000,
            disableCountDown: true,
            disableIcons: true
          });
        });
    }

  }

})();
