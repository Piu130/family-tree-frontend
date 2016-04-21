(function () {
  'use strict';

  angular
    .module('tree', [
      'ui.bootstrap',
      'married'
    ])
    .controller('TreeController', TreeController);

  /** @ngInject */
  function TreeController($state, $uibModal, familyMemberRepository) {
    var vm = this;

    vm.searchText = '';
    var htmlTree = '';

    vm.search = function () {
      angular.element('#tree').treeview('search', [vm.searchText]);
    };

    function onNodeSelected(event, data) {

      if (angular.isArray(data.id)) {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/tree/templates/married.template.html',
          controller: 'MarriedController as married',
          resolve: {
            data: function () {
              return data;
            }
          }
        });

        modalInstance.result
          .then(function (selectedItem) {
            vm.selected = selectedItem;
          });
      } else {
        $state.go('person', {
          id: data.id
        });
      }
    }

    familyMemberRepository
      .get()
      .then(function (response) {
        var rootMemberObject = familyMemberRepository.getRoot(response);

        htmlTree += '[';
        htmlTree += getOpenFamilyMemberString();
        htmlTree += getFamilyMemberString(rootMemberObject);

        addChildren(rootMemberObject.id);

        htmlTree += '}';
        htmlTree += getCloseChildrenString();

        angular.element('#tree').treeview(
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
          .sort(function (a, b) {
            return a.order > b.order;
          })
          .forEach(function (child) {
            htmlTree += getOpenFamilyMemberString();
            htmlTree += getFamilyMemberString(child);
            addChildren(child.id);
            htmlTree += getCloseFamilyMemberString();
          });
        htmlTree = htmlTree.removeLast();
        htmlTree += getCloseChildrenString();
      }
      else {
        htmlTree = htmlTree.removeLast();
      }
    }

    function getFamilyMemberString(familyMember) {
      var familyMemberString = '';

      var spouse = familyMemberRepository.getSpouse(familyMember.id);

      familyMemberString += '"familyMember":' + angular.toJson(familyMember) + ',"text":"';
      familyMemberString += familyMemberRepository.getNamesAsString(familyMember, true);
      if (spouse) {
        familyMemberString += ' <span class=\'no-text-wrap\'>';
        familyMemberString += '& ';
        familyMemberString += familyMemberRepository.getNamesAsString(spouse, true);
        familyMemberString += '</span>';
      }

      if (spouse) {
        familyMemberString += '","id":["' + familyMember.id + '","' + spouse.id + '"],' + '"spouse":' + angular.toJson(spouse) + ',';
      } else {
        familyMemberString += '","id":"' + familyMember.id + '",';
      }

      return familyMemberString;
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
  }

})();
