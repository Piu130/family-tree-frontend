(function() {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('imageRepository', imageRepository);

  /** @ngInject */
  function imageRepository($log, $http, apiHost, familyMemberRepository) {

    var service = {
      query: query,
      getImageName: getImageName
    };

    return service;

    function query(person) {
      var imageName = getImageName(person);
      return $http
        .get(apiHost + '/containers/familyMemberImages/download/' + imageName)
        .then(queryComplete);

      function queryComplete(response) {
        return response.data;
      }
    }

    function getImageName(person) {
      var fileName = (familyMemberRepository.getNamesAsString(person) + ' ' + new Date(person.birthDay).getFullYear()).replace(/ /g, '_');
      return apiHost + '/containers/familyMemberImages/download/' + fileName + '.jpg';
    }
  }
})();
