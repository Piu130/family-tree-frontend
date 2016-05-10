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
      vm.title = familyMemberRepository.getNamesAsString(person, true);
    }

    function setImage(person) {
      vm.imgSrc = imageRepository.getImgSrc(person);
    }

    function setInfo(id) {
      familyMemberRepository
        .getInfo(id)
        .then(function (response) {
          vm.info = angular.extend(vm.info, response);
          vm.info.age = familyMemberRepository.getAge(response.birthday);
        })
        .catch(function (error) {
          if (error.status === 401) {
            growl.error($translate.instant('PERSON.NO_DATA_ACCESS'), {
              ttl: 3000,
              disableCountDown: true,
              disableIcons: true
            });
          } else if (error.status === 404) {
            growl.error($translate.instant('PERSON.NO_DATA_FOUND'), {
              ttl: 3000,
              disableCountDown: true,
              disableIcons: true
            });
          }
        });
    }
  }

})();
