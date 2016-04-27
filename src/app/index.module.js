(function () {
  'use strict';

  angular
    .module('familyTreeFrontend', [
      'ui.router',
      'ui.bootstrap',
      'ngSanitize',
      'ngCookies',
      'angular-loading-bar',
      'angular-growl',
      'login',
      'tree',
      'person',
      'emblem',
      'admin'
    ]);

})();
