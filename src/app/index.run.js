(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $log, $state, $translate, growl, loginService) {

    String.prototype.removeLast = function () {
      return this.substring(0, this.length - 1);
    };

    $rootScope.$on('$stateChangeStart', function(event, toState){

      // Move this to a service
      if (toState.authenticate && !loginService.isAuthenticated()){
        // User isn’t authenticated
        growl.error($translate.instant('NOT_AUTHENTICATED'), {
          ttl: 3000,
          disableCountDown: true,
          disableIcons: true
        });

        $state.transitionTo('login');
        event.preventDefault();
      }
    });

    $log.debug('runBlock end');
  }

})();
