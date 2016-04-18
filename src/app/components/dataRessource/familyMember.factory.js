(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('FamilyMember', familyMember);

  /** @ngInject */
  function familyMember() {
    function constructor(familyMember) {
      //return FamilyMember[] = familyMember;
    }

    function FamilyMember() {

    }

    FamilyMember.prototype.getAge = function () {
      var today = new Date();
      var birthDay = new Date(this.birthDay);
      var age = today.getFullYear() - birthDay.getFullYear();
      var m = today.getMonth() - birthDay.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDay.getDate())) {
        age--;
      }
      return age;
    };

    return constructor;
  }
})();
