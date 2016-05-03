(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('familyMemberInfoRepository', familyMemberInfoRepository);

  /** @ngInject */
  function familyMemberInfoRepository($http, apiHost) {

    const service = {
      get: getAll,
      query: query,
      post: post
    };

    let familyMembers = [];

    return service;

    function getAll() {
      return $http
        .get(apiHost + '/familyMemberInfos')
        .then(_getComplete)
        .then(function(data) {
          familyMembers = data;
          return data;
        });
    }

    function query(id) {
      return $http
        .get(apiHost + '/familyMemberInfos/' + id)
        .then(_getComplete);
    }

    function post(data) {
      return $http
        .post(apiHost + '/familyMemberInfos', data);
    }
  }

  function _getComplete(response) {
    return response.data;
  }

})();
