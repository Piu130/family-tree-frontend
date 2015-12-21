(function() {
  'use strict';

  angular
    .module('main', [])
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $state, $uibModal, familyMemberRepository, rootMember) {
    $scope.searchText = '';

    var htmlTree = '';

    familyMemberRepository
      .get()
      .then(function (response) {
        var rootMemberObject = response.find(function (familyMember) {
          return (familyMember.firstName === rootMember.firstName && familyMember.lastName === rootMember.lastName);
        });

        htmlTree += '[';
        openFamilyMember(rootMemberObject);

        addSpouseAndChildren(rootMemberObject.id);

        htmlTree += '}';
        closeChildren();

        $('#tree').treeview(
          {
            data: htmlTree,
            enableLinks: false,
            levels: 3,

            onNodeSelected: onNodeSelected
          }
        );
      });

    function addSpouseAndChildren(id) {
      addSpouse(id);
      addChildren(id);
    }

    function addSpouse(id) {
      var spouse = familyMemberRepository.getSpouse(id);
      if (spouse) {
        console.log(htmlTree);
        htmlTree += '"spouse":{';
        addFamilyMemberContent(spouse);
        removeLastChar();
        htmlTree += '},';
        //addLiContent(spouse);
      }
    }

    function addChildren(id) {
      var children = familyMemberRepository.getChildren(id);

      if (children) {
        openChildren();
        children
          .sort(function(a, b) {
            return a.order > b.order;
          })
          .forEach(function (child) {
            openFamilyMember(child);
            addSpouseAndChildren(child.id);
            closeFamilyMember();
          });
        removeLastChar();
        closeChildren();
      }
      else {
        removeLastChar();
      }
    }

    function addFamilyMemberContent(familyMember) {
      var spouse = familyMemberRepository.getSpouse(familyMember.id);
      if (spouse) {
        htmlTree += '"text":"' + familyMember.firstName + ' ' + familyMember.lastName + ' + ' + spouse.firstName +
          ' ' + spouse.lastName + '","id":["' + familyMember.id + '","' + spouse.id + '"],';
      } else {
        htmlTree += '"text":"' + familyMember.firstName + ' ' + familyMember.lastName +
          '","id":"' + familyMember.id + '",';
      }
    }

    function openFamilyMember(familyMember) {
      htmlTree += '{';
      addFamilyMemberContent(familyMember);
    }

    function closeFamilyMember() {
      htmlTree += '},';
    }

    function openChildren() {
      htmlTree += '"nodes":[';
    }

    function closeChildren() {
      htmlTree += ']';
    }

    function removeLastChar() {
      htmlTree = htmlTree.substring(0, htmlTree.length - 1);
    }

    $scope.search = function() {
      $('#tree').treeview('search', [$scope.searchText]);
    };

    function onNodeSelected(event, data) {
      if(Array.isArray(data.id)) {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/main/templates/married.template.html',
          controller: 'MarriedController',
          ids: data.id
        });

        modalInstance.result.then(function (selectedItem) {
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
