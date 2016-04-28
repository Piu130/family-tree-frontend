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
    function NavbarController($translate, $state, growl, loginService) {
      const vm = this;

      vm.logout = function () {
        loginService
          .logout()
          .then(function () {
            $state.go('login');
          })
          .catch(function () {
            growl.error($translate.instant('NAVBAR.SOMETHING_WENT_WRONG'), {
              ttl: 3000,
              disableCountDown: true,
              disableIcons: true
            });
          });
      };

      vm.changeLanguage = function(languageCode) {
        $translate
          .use(languageCode)
          .catch(function() {
            growl.error($translate.instant('NAVBAR.COULD_NOT_LOAD_LANG'), {
              ttl: 3000,
              disableCountDown: true,
              disableIcons: true
            });
          });
      };
    }
  }

})();
