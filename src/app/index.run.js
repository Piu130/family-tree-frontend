(function() {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
