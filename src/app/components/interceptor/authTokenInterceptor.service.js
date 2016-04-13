(function() {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('authTokenInterceptor', AuthTokenInterceptor);

  /** @ngInject */
  function AuthTokenInterceptor($cookies, apiHost) {
    return {
      'request': function(config) {

        if($cookies.family_tree_access_token && config.url.startsWith(apiHost)) {
          config.headers['Authorization'] = $cookies.family_tree_access_token;
        }

        return config;
      }
    };
  }
})();

