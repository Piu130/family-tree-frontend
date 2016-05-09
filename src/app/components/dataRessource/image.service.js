(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('imageRepository', imageRepository);

  /** @ngInject */
  function imageRepository($http, apiHost, Upload) {

    return {
      getImgSrc: getImgSrc,
      download: download,
      upload: upload,
      uploadProfilePicture: uploadProfilePicture
    };

    function getImgSrc(person) {
      return apiHost + '/containers/familyMemberImages/download/' + person.id + '_profilepicture.jpg';
    }

    function download(file) {
      return $http
        .get(apiHost + '/containers/familyMemberImages/download/' + file);
    }

    function upload(file, fileName) {

      return Upload.upload({
        url: apiHost + '/containers/familyMemberImages/upload',
        data: { file: Upload.rename(file, fileName) }
      });
    }

    function uploadProfilePicture(picture, person) {
      upload(picture, person.id + '_profilepicture.jpg');
    }
  }
})();
