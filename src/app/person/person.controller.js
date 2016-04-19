(function () {
  'use strict';

  angular
    .module('person', [])
    .controller('PersonController', PersonController);

  /** @ngInject */
  function PersonController($stateParams, familyMemberRepository, imageRepository) {
    var vm = this;
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
        setAge(response);
      });

    function setTitle(person) {
      vm.title = familyMemberRepository.getNamesAsString(person);
    }

    function setImage(person) {
      vm.imgSrc = imageRepository.getImageName(person);
    }

    function setAge(person) {
      vm.info.age = familyMemberRepository.getAge(person);
    }

    function setInfo(id) {
      familyMemberRepository
        .getInfo(id)
        .then(function (response) {
          vm.info = angular.extend(vm.info, response);
        });
    }

  }

})();
