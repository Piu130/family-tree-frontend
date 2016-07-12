(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('familyMemberRepository', familyMemberRepository);

  /** @ngInject */
  function familyMemberRepository($resource, apiHost) {
    return $resource(apiHost + '/familyMembers/:familyMemberId/:relation', {familyMemberId: '@familyMemberId', relation: '@relation'}, {
      update: {method: 'PUT'},
      getInfo: {method: 'GET', params: {relation: 'info'}}
    });
  }

})();
