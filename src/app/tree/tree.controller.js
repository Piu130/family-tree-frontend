(function () {
  'use strict';

  angular
    .module('tree', [
      'ui.bootstrap',
      'married'
    ])
    .controller('TreeController', TreeController);

  /** @ngInject */
  function TreeController($state, $uibModal, familyMemberRepository, familyMemberObject) {
    const vm = this;

    vm.search = search;
    vm.searchText = '';

    activate();

    function search() {
      angular.element('#tree').treeview('search', [vm.searchText]);
    }

    let htmlTree = '';

    function onNodeSelected(event, data) {
      angular.element('#tree').treeview('unselectNode', [data.nodeId]);

      if (angular.isArray(data.id)) {
        const modalInstance = $uibModal.open({
          templateUrl: 'app/tree/templates/married.template.html',
          controller: 'MarriedController as married',
          resolve: {
            data: function () {
              return data;
            }
          },
          windowClass: 'center-modal'
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

    function activate() {
      return familyMemberRepository
        .query()
        .$promise
        .then(function (response) {
          familyMemberObject.setFamilyMembers(response);
          const rootMemberObject = familyMemberObject.getRoot();

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
              collapseIcon: 'fa fa-minus',
              expandIcon: 'fa fa-plus',
              highlightSelected: false,
              searchResultBackColor: 'yellow',
              searchResultColor: null,

              onNodeSelected: onNodeSelected
            }
          );

          return response;
        });
    }

    function addChildren(id) {
      const children = familyMemberObject.getChildren(id);

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
      } else {
        htmlTree = htmlTree.removeLast();
      }
    }

    function getFamilyMemberString(familyMember) {
      let familyMemberString = '';

      const spouse = familyMemberObject.getSpouse(familyMember.id);

      familyMemberString += '"familyMember":' + angular.toJson(familyMember) + ',"text":"';
      familyMemberString += familyMemberObject.getNamesAsString(familyMember, true);
      if (spouse) {
        familyMemberString += ' <span class=\'no-text-wrap\'>';
        familyMemberString += '& ';
        familyMemberString += familyMemberObject.getNamesAsString(spouse, true);
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
