(function() {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $httpProvider.interceptors.push('authTokenInterceptor');
  }

})();
