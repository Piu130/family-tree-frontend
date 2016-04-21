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
      var credentials = {
        email: user.email,
        password: user.password
      };

      return $http
        .post(apiHost + '/users/login', credentials)
        .then(function (response) {
          var expirationDate = null;

          if (user.rememberMe) {
            expirationDate = new Date();
            expirationDate.setMonth(expirationDate.getMonth() + 1);
          }

          $cookies.put('family_tree_access_token', response.data.id, { expires: expirationDate });
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
