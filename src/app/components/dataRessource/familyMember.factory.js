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
      const today = new Date();
      const birthDay = new Date(this.birthDay);
      let age = today.getFullYear() - birthDay.getFullYear();
      const m = today.getMonth() - birthDay.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDay.getDate())) {
        age--;
      }
      return age;
    };

    return constructor;
  }
})();
