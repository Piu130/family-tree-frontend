(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('imageRepository', imageRepository);

  /** @ngInject */
  function imageRepository($http, apiHost, familyMemberRepository) {

    return {
      query: query,
      getImageName: getImageName
    };

    function query(person) {
      const imageName = getImageName(person);
      return $http
        .get(apiHost + '/containers/familyMemberImages/download/' + imageName)
        .then(queryComplete);

      function queryComplete(response) {
        return response.data;
      }
    }

    function getImageName(person) {
      const fileName = (familyMemberRepository.getNamesAsString(person) + ' ' + new Date(person.birthDay).getFullYear()).replace(/ /g, '_');
      return apiHost + '/containers/familyMemberImages/download/' + fileName + '.jpg';
    }
  }
})();
