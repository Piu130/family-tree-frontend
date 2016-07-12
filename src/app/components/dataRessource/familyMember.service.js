(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('familyMemberObject', familyMemberObject);

  /** @ngInject */
  function familyMemberObject(rootMember) {

    const service = {
      getSpouse: getSpouse,
      getChildren: getChildren,
      getNamesAsString: getNamesAsString,
      getAge: getAge,
      getRoot: getRoot,
      setFamilyMembers: setFamilyMembers
    };

    let _familyMembers = [];

    return service;

    function setFamilyMembers(familyMembers) {
      _familyMembers = familyMembers;
    }

    function getRoot() {
      return _familyMembers.find(function (familyMember) {
        return (familyMember.firstNames[0] === rootMember.firstName && familyMember.lastNames[0] === rootMember.lastName);
      });
    }

    function getSpouse(id) {
      return _familyMembers.find(function (element) {
        return element.spouseId === id;
      });
    }

    function getChildren(id) {
      const children = _familyMembers.filter(function (element) {
        return element.parentId === id;
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

    function getAge(birthday) {
      if (!birthday) {
        return null;
      }

      const today = new Date();
      const birthdayDate = new Date(birthday);
      let age = today.getFullYear() - birthdayDate.getFullYear();
      const m = today.getMonth() - birthdayDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthdayDate.getDate())) {
        age--;
      }

      return age;
    }
  }

})();
