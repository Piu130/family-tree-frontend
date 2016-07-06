(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('imageRepository', imageRepository);

  /** @ngInject */
  function imageRepository($http, apiHost, Upload, $cookies) {

    return {
      getImgSrc: getImgSrc,
      download: download,
      upload: upload,
      uploadProfilePicture: uploadProfilePicture
    };

    function getImgSrc(person) {
      return apiHost + '/containers/family_member_images/download/' + person.id + '_profilepicture.jpg?access_token=' + $cookies.get('family_tree_access_token');
    }

    function download(file) {
      return $http
        .get(apiHost + '/containers/family_member_images/download/' + file);
    }

    function upload(file, fileName) {

      return Upload.upload({
        url: apiHost + '/containers/family_member_images/upload',
        data: { file: Upload.rename(file, fileName) }
      });
    }

    function uploadProfilePicture(picture, person) {
      upload(picture, person.id + '_profilepicture.jpg');
    }
  }
})();
