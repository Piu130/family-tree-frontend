(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('familyMemberRepository', familyMemberRepository);

  /** @ngInject */
  function familyMemberRepository($http, apiHost, rootMember) {

    const service = {
      get: getAll,
      query: query,
      getInfo: getInfo,
      getSpouse: getSpouse,
      getChildren: getChildren,
      getNamesAsString: getNamesAsString,
      getAge: getAge,
      getRoot: getRoot
    };

    let familyMembers = [];

    return service;

    function getAll() {
      return $http
        .get(apiHost + '/familyMembers')
        .then(_getComplete)
        .then(function(data) {
          familyMembers = data;
          return data;
        });
    }

    function query(id) {
      return $http
        .get(apiHost + '/familyMembers/' + id)
        .then(_getComplete);
    }

    function getRoot(familyMembers) {
      return familyMembers.find(function (familyMember) {
        return (familyMember.firstNames[0] === rootMember.firstName && familyMember.lastNames[0] === rootMember.lastName);
      });
    }

    function getInfo(id) {
      return $http
        .get(apiHost + '/familyMembers/' + id + '/info')
        .then(_getComplete);
    }

    function getSpouse(id) {
      return familyMembers.find(function (element) {
        return element.familyMemberId === id;
      });
    }

    function getChildren(id) {
      const children = familyMembers.filter(function (element) {
        return element.childrenId === id;
      });

      if (children.length > 0) {
        return children;
      }

      return null;
    }

    function getNamesAsString(familyMember, withCross) {
      let names = '';

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

      const today = new Date();
      const birthDay = new Date(familyMember.birthDay);
      let age = today.getFullYear() - birthDay.getFullYear();
      const m = today.getMonth() - birthDay.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDay.getDate())) {
        age--;
      }

      return age;
    }
  }

  function _getComplete(response) {
    return response.data;
  }

})();
