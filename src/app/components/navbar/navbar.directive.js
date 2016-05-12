(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'navbar',
      bindToController: true
    };

    /** @ngInject */
    function NavbarController($rootScope, $translate, $state, growl, loginService) {
      const vm = this;

      vm.changeLanguage = changeLanguage;
      vm.currentLanguage = $translate.use();
      vm.loggedIn = loginService.isAuthenticated();
      vm.logout = logout;

      $rootScope.$on('$translateChangeEnd', function () {
        vm.currentLanguage = $translate.use();
      });

      function logout() {
        loginService
          .logout()
          .then(function () {
            $state.go('login');
          });
      }

      function changeLanguage(languageCode) {
        $translate
          .use(languageCode)
          .catch(function () {
            growl.error($translate.instant('NAVBAR.COULD_NOT_LOAD_LANG'), {
              ttl: 3000,
              disableCountDown: true,
              disableIcons: true
            });
          });
      }
    }
  }

})();
