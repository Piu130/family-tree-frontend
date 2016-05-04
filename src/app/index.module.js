(function () {
  'use strict';

  angular
    .module('familyTreeFrontend', [
      'ui.router',
      'ui.bootstrap',
      'ngSanitize',
      'ngCookies',
      'pascalprecht.translate',
      'angular-loading-bar',
      'angular-growl',
      'ngFileUpload',
      'login',
      'tree',
      'person',
      'emblem',
      'admin'
    ]);

})();
