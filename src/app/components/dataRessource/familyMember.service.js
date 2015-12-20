(function() {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('familyMemberRepository', familyMemberRepository);

  /** @ngInject */
  function familyMemberRepository($log, $http, apiHost) {

    var service = {
      apiHost: apiHost,
      get: getAll,
      getSpouse: getSpouse,
      getChildren: getChildren
    };

    var familyMembers = [];

    return service;

    function getAll() {
      return $http.get(apiHost + '/familyMembers')
        .then(getAllComplete)
        .catch(getAllFailed);

      function getAllComplete(response) {
        familyMembers = response.data;
        return response.data;
      }

      function getAllFailed(error) {
        $log.error('XHR Failed for get.\n' + angular.toJson(error.data, true));
      }
    }

    function getSpouse(id) {
      return familyMembers.find(function(element) {
        return element.familyMemberId === id;
      });
    }

    function getChildren(id) {
      var children = familyMembers.filter(function(element) {
        return element.childrenId === id;
      });

      if(children.length > 0) {
        return children;
      }

      return null;
    }
  }
})();
