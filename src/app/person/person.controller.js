(function () {
  'use strict';

  angular
    .module('person', [
      'ui.bootstrap'
    ])
    .controller('PersonController', PersonController);

  /** @ngInject */
  function PersonController($translate, $stateParams, growl, familyMemberRepository, familyMemberObject, imageRepository) {
    const vm = this;

    vm.imgSrc = '';
    vm.info = {};
    vm.title = '';

    activate();

    function activate() {
      return familyMemberRepository
        .get({familyMemberId: $stateParams.id})
        .$promise
        .then(function (response) {
          vm.info = response;
          setInfo(response.id);
          setTitle(response);
          setImage(response);

          return response;
        });
    }

    function setTitle(person) {
      vm.title = familyMemberObject.getNamesAsString(person, true);
    }

    function setImage(person) {
      vm.imgSrc = imageRepository.getImgSrc(person);
    }

    function setInfo(id) {
      familyMemberRepository
        .getInfo({familyMemberId: id})
        .$promise
        .then(function (response) {
          vm.info = angular.extend(vm.info, response);
          vm.info.age = familyMemberObject.getAge(response.birthday);
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
