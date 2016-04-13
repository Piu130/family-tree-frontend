(function() {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('authTokenInterceptor', AuthTokenInterceptor);

  /** @ngInject */
  function AuthTokenInterceptor() {
    return {
      'request': function(config) {
        config.headers['Authorization'] = 'token';
        return config;
      }
    };
  }
})();

