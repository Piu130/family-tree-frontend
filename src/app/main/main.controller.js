(function() {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $state, familyMemberRepository, rootMember) {
    $scope.searchText = '';

    var htmlTree = '';

    familyMemberRepository
      .get()
      .then(function (response) {
        var rootMemberObject = response.find(function (familyMember) {
          return (familyMember.firstName === rootMember.firstName && familyMember.lastName === rootMember.lastName);
        });

        htmlTree += '[';
        startLi(rootMemberObject);

        addSpouseAndChildren(rootMemberObject.id);

        htmlTree += '}';
        closeUl();

        $('#tree').treeview(
          {
            data: htmlTree,
            enableLinks: true,
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
        //htmlTree += ' + ';
        //addLiContent(spouse);
      }
    }

    function addChildren(id) {
      var children = familyMemberRepository.getChildren(id);

      if (children) {
        startUl();
        children
          .sort(function(a, b) {
            return a.order > b.order;
          })
          .forEach(function (child) {
          startLi(child);
          addSpouseAndChildren(child.id);
          closeLi();
        });
        removeLast();
        closeUl();
      }
      else {
        removeLast();
      }
    }

    function addLiContent(familyMember) {
      htmlTree += '"text":"' + familyMember.firstName + ' ' + familyMember.lastName +
        '","bla":"bla","id":"' + familyMember.id + '",';
    }

    function startLi(familyMember) {
      htmlTree += '{';
      addLiContent(familyMember);
    }

    function closeLi() {
      htmlTree += '},';
    }

    function startUl() {
      htmlTree += '"nodes":[';
    }

    function closeUl() {
      htmlTree += ']';
    }

    function removeLast() {
      htmlTree = htmlTree.substring(0, htmlTree.length - 1);
    }

    $scope.search = function() {
      $('#tree').treeview('search', [$scope.searchText, {
        ignoreCase: true
      }]);
    };

    function onNodeSelected(event, data) {
      $state.go('person', {
        id: data.id
      });
    }
  }

})();
