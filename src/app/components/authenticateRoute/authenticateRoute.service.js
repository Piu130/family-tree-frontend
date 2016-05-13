(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('authenticateRouteService', authenticateRouteService);

  /** @ngInject */
  function authenticateRouteService($rootScope, $state, $translate, growl, loginService) {

    return {
      initialize: initialize
    };

    function initialize() {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        // Move this to a service
        if (toState.authenticate && !loginService.isAuthenticated()) {
          event.preventDefault();
          // User isn’t authenticated
          growl.error($translate.instant('NOT_AUTHENTICATED'), {
            ttl: 3000,
            disableCountDown: true,
            disableIcons: true
          });

          $state.transitionTo('login', {
            toState: toState,
            toParams: toParams
          });
        }
      });
    }
  }
})();
