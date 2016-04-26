(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    const directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'navbar',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(loginService, $state, growl) {
      const vm = this;

      vm.logout = function () {
        loginService
          .logout()
          .then(function () {
            $state.go('login');
          })
          .catch(function () {
            growl.error('Etwas ist schief gegangen. Versuchen Sie es noch einmal.', {
              ttl: 3000,
              disableCountDown: true,
              disableIcons: true
            });
          });
      }
    }
  }

})();
