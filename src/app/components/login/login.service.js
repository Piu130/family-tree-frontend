(function () {
  'use strict';

  angular
    .module('login')
    .factory('loginService', loginService);

  /** @ngInject */
  function loginService($http, $cookies, apiHost) {

    const service = {
      login: login,
      logout: logout
    };

    return service;

    function login(user) {
      // 3h in seconds
      // if rememberMe 4 weeks else 3h in seconds
      const ttl = user.rememberMe ? 2419200 : 10800;

      const credentials = {
        email: user.email,
        password: user.password,
        ttl: ttl
      };

      return $http
        .post(apiHost + '/users/login', credentials)
        .then(function (response) {
          const expires = new Date().getTime() + response.data.ttl * 1000;

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
