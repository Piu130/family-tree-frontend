(function() {
  'use strict';

  angular
    .module('person', [])
    .controller('PersonController', PersonController);

  /** @ngInject */
  function PersonController($scope, $stateParams, familyMemberRepository, imageRepository) {
    $scope.title = '';
    $scope.imgSrc = '';
    $scope.info = {};


    familyMemberRepository
      .query($stateParams.id)
      .then(function(response) {
        $scope.info = response;
        setInfo(response.id);
        setTitle(response);
        setImage(response);
        setAge(response);
      });

    function setTitle(person) {
      $scope.title = familyMemberRepository.getNamesAsString(person);
    }

    function setImage(person) {
      $scope.imgSrc = imageRepository.getImageName(person);
    }

    function setAge(person) {
      $scope.info.age = familyMemberRepository.getAge(person);
    }

    function setInfo(id) {
      familyMemberRepository
        .getInfo(id)
        .then(function(response) {
          $scope.info = angular.extend($scope.info, response);
        });
    }

  }

})();
