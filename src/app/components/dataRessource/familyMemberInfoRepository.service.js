(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('familyMemberInfoRepository', familyMemberInfoRepository);

  /** @ngInject */
  function familyMemberInfoRepository($resource, apiHost) {
    return $resource(apiHost + '/familyMemberInfos/:familyMemberInfoId', {familyMemberInfoId: '@familyMemberInfoId'}, {update: {method: 'PUT'}});
  }

})();
