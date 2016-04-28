(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, $translateProvider, cfpLoadingBarProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    cfpLoadingBarProvider.includeSpinner = false;

    $httpProvider.interceptors.push('authTokenInterceptor');

    $translateProvider.useStaticFilesLoader({
      prefix: 'languages/lang-',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');
  }

})();
