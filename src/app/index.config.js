(function() {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
  }

})();
