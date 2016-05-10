(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, $translateProvider, $locationProvider, cfpLoadingBarProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    $locationProvider.html5Mode(true);

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
