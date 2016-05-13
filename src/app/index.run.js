(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, stringfunctionsService, authenticateRouteService) {

    stringfunctionsService.initialize();
    authenticateRouteService.initialize();



    $log.debug('runBlock end');
  }

})();
