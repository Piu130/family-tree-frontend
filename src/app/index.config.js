(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, $translateProvider, cfpLoadingBarProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $httpProvider.interceptors.push('authTokenInterceptor', 'serverErrorInterceptor');

    $translateProvider.useStaticFilesLoader({
      prefix: 'languages/lang-',
      suffix: '.json'
    });

    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.useCookieStorage();
    $translateProvider.preferredLanguage('en');

    cfpLoadingBarProvider.includeSpinner = false;
  }

})();
