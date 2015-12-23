(function() {
  'use strict';

  angular
    .module('main', ['married'])
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $state, $uibModal, familyMemberRepository, rootMember) {
    $scope.searchText = '';

    var htmlTree = '';

    familyMemberRepository
      .get()
      .then(function (response) {
        var rootMemberObject = response.find(function (familyMember) {
          return (familyMember.firstNames[0] === rootMember.firstName && familyMember.lastNames[0] === rootMember.lastName);
        });

        htmlTree += '[';
        htmlTree += getOpenFamilyMemberString();
        htmlTree += getFamilyMemberString(rootMemberObject);

        addChildren(rootMemberObject.id);

        htmlTree += '}';
        htmlTree += getCloseChildrenString();

        $('#tree').treeview(
          {
            data: htmlTree,
            enableLinks: false,
            levels: 3,

            onNodeSelected: onNodeSelected
          }
        );
      });

    function addChildren(id) {
      var children = familyMemberRepository.getChildren(id);

      if (children) {
        htmlTree += getOpenChildrenString();
        children
          .sort(function(a, b) {
            return a.order > b.order;
          })
          .forEach(function (child) {
            htmlTree += getOpenFamilyMemberString();
            htmlTree += getFamilyMemberString(child);
            addChildren(child.id);
            htmlTree += getCloseFamilyMemberString();
          });
        htmlTree = removeLastChar(htmlTree);
        htmlTree += getCloseChildrenString();
      }
      else {
        htmlTree = removeLastChar(htmlTree);
      }
    }

    function getFamilyMemberString(familyMember) {
      var familyMemberString = '';

      var spouse = familyMemberRepository.getSpouse(familyMember.id);

      familyMemberString += '"familyMember":' + JSON.stringify(familyMember) + ',"text":"';
      familyMemberString += getNamesAsString(familyMember);
      if (spouse) {
        familyMemberString += '+ ';
        familyMemberString += getNamesAsString(spouse);
      }
      familyMemberString = removeLastChar(familyMemberString);
      if (spouse) {
        familyMemberString += '","id":["' + familyMember.id + '","' + spouse.id + '"],' + '"spouse":' + JSON.stringify(spouse) + ',';
      } else {
        familyMemberString += '","id":"' + familyMember.id + '",';
      }

      return familyMemberString;
    }

    function getNamesAsString(familyMember) {
      var names = '';
      familyMember.firstNames.forEach(function(firstName) { names += firstName + ' '; });
      familyMember.lastNames.forEach(function(lastName) { names += lastName + ' '; });
      return names;
    }

    function getOpenFamilyMemberString() {
      return '{';
    }

    function getCloseFamilyMemberString() {
      return '},';
    }

    function getOpenChildrenString() {
      return '"nodes":[';
    }

    function getCloseChildrenString() {
      return ']';
    }

    function removeLastChar(string) {
      return string.substring(0, string.length - 1);
    }

    $scope.search = function() {
      $('#tree').treeview('search', [$scope.searchText]);
    };

    function onNodeSelected(event, data) {

      if(Array.isArray(data.id)) {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/main/templates/married.template.html',
          controller: 'MarriedController',
          resolve: {
            data: function () {
              return data;
            }
          }
        });

        modalInstance.result
          .then(function (selectedItem) {
            $scope.selected = selectedItem;
          });
      } else {
        $state.go('person', {
          id: data.id
        });
      }
    }
  }

})();
