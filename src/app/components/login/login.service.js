(function () {
  'use strict';

  angular
    .module('login')
    .factory('loginService', loginService);

  /** @ngInject */
  function loginService($http, $cookies, apiHost) {

    var service = {
      login: login,
      logout: logout
    };

    return service;

    function login(user) {
      // 3h in seconds
      var ttl = 10800;
      if (user.rememberMe) {
        // 4 weeks in seconds
        ttl = 2419200;
      }

      var credentials = {
        email: user.email,
        password: user.password,
        ttl: ttl
      };

      return $http
        .post(apiHost + '/users/login', credentials)
        .then(function (response) {
          var expires = new Date().getTime() + response.data.ttl * 1000;

          $cookies.put('family_tree_access_token', response.data.id, { expires: new Date(expires) });
          return response;
        });
    }

    function logout() {
      return $http
        .post(apiHost + '/users/logout')
        .then(function (response) {
          $cookies.remove('family_tree_access_token');
          return response;
        });
    }
  }
})();
