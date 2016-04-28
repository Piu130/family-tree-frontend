(function () {
  'use strict';

  angular
    .module('person', [
      'ui.bootstrap'
    ])
    .controller('PersonController', PersonController);

  /** @ngInject */
  function PersonController($translate, $stateParams, growl, familyMemberRepository, imageRepository) {
    const vm = this;
    vm.title = '';
    vm.imgSrc = '';
    vm.info = {};


    familyMemberRepository
      .query($stateParams.id)
      .then(function (response) {
        vm.info = response;
        setInfo(response.id);
        setTitle(response);
        setImage(response);
      });

    function setTitle(person) {
      vm.title = familyMemberRepository.getNamesAsString(person);
    }

    function setImage(person) {
      vm.imgSrc = imageRepository.getImageName(person);
      vm.imgSrc = getImageUrl();
    }

    function setInfo(id) {
      familyMemberRepository
        .getInfo(id)
        .then(function (response) {
          vm.info = angular.extend(vm.info, response);
          vm.info.age = familyMemberRepository.getAge(response.birthday);
        })
        .catch(function () {
          growl.error($translate.instant('PERSON.NO_DATA_FOUND'), {
            ttl: 3000,
            disableCountDown: true,
            disableIcons: true
          });
        });
    }

    // Test several image formats
    const images = [
      'https://pixabay.com/static/uploads/photo/2016/01/09/16/58/body-1130559_960_720.jpg',
      'https://pixabay.com/static/uploads/photo/2016/04/04/21/49/girl-1308309_960_720.jpg',
      'https://pixabay.com/static/uploads/photo/2016/03/31/17/53/girl-1293985_960_720.jpg',
      'https://pixabay.com/static/uploads/photo/2014/11/15/14/45/girl-532051_960_720.jpg'
    ];

    var imgNumber = Math.floor(Math.random() * images.length);
    function getImageUrl() {
      return images[imgNumber];
    }

  }

})();
