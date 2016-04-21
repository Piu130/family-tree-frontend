(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, cfpLoadingBarProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    cfpLoadingBarProvider.includeSpinner = false;

    $httpProvider.interceptors.push('authTokenInterceptor');
  }

})();
