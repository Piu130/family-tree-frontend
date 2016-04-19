(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('familyMemberRepository', familyMemberRepository);

  /** @ngInject */
  function familyMemberRepository($log, $http, apiHost, rootMember) {

    var service = {
      get: getAll,
      query: query,
      getInfo: getInfo,
      getSpouse: getSpouse,
      getChildren: getChildren,
      getNamesAsString: getNamesAsString,
      getAge: getAge,
      getRoot: getRoot
    };

    var familyMembers = [];

    return service;

    function getAll() {
      return $http
        .get(apiHost + '/familyMembers')
        .then(getAllComplete)
        .catch(getFailed);

      function getAllComplete(response) {
        familyMembers = response.data;
        return response.data;
      }
    }

    function query(id) {
      return $http
        .get(apiHost + '/familyMembers/' + id)
        .then(queryComplete)
        .catch(getFailed);

      function queryComplete(response) {
        return response.data;
      }
    }

    function getRoot(familyMembers) {
      return familyMembers.find(function (familyMember) {
        return (familyMember.firstNames[0] === rootMember.firstName && familyMember.lastNames[0] === rootMember.lastName);
      });
    }

    function getInfo(id) {
      return $http
        .get(apiHost + '/familyMembers/' + id + '/info')
        .then(getInfoComplete)
        .catch(getFailed);

      function getInfoComplete(response) {
        return response.data;
      }
    }

    function getFailed(error) {
      $log.error('XHR Failed for get.\n' + angular.toJson(error.data, true));
    }

    function getSpouse(id) {
      return familyMembers.find(function (element) {
        return element.familyMemberId === id;
      });
    }

    function getChildren(id) {
      var children = familyMembers.filter(function (element) {
        return element.childrenId === id;
      });

      if (children.length > 0) {
        return children;
      }

      return null;
    }

    function getNamesAsString(familyMember, withCross) {
      var names = '';

      familyMember.firstNames.forEach(function (firstName) {
        names += firstName + ' ';
      });
      familyMember.lastNames.forEach(function (lastName) {
        names += lastName + ' ';
      });

      if (withCross && familyMember.dayOfDeath) {
        names += '(✝) ';
      }

      return names.removeLast();
    }

    function getAge(familyMember) {
      if (!familyMember.birthDay) {
        return null;
      }

      var today = new Date();
      var birthDay = new Date(familyMember.birthDay);
      var age = today.getFullYear() - birthDay.getFullYear();
      var m = today.getMonth() - birthDay.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDay.getDate())) {
        age--;
      }

      return age;
    }
  }
})();
