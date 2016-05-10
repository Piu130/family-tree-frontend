(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('familyMemberInfoRepository', familyMemberInfoRepository);

  /** @ngInject */
  function familyMemberInfoRepository($http, apiHost) {

    const service = {
      query: query,
      post: post
    };

    return service;

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
