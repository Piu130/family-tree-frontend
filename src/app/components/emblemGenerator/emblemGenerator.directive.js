(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .directive('emblem', emblem);

  /** @ngInject */
  function emblem() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/emblemGenerator/emblemGenerator.html',
      controller: EmblemController,
      controllerAs: 'emblem',
      bindToController: { width: '@' },
      scope: true
    };

    /** @ngInject */
    function EmblemController() {
      const vm = this;

      vm.center = vm.width / 2;

      // Stars outter radius
      let r1 = vm.width / 2.5;
      // Stars inner radius
      let r2 = vm.width / 7.5;

      // Emblems x padding
      vm.xPadding = vm.width / 30;

      // Some star distances
      let x1 = Math.cos(45*(Math.PI / 180)) * r1;
      let y1 = Math.sin(45*(Math.PI / 180)) * r1;
      let x2 = Math.cos(67.5*(Math.PI / 180)) * r2;
      let y2 = Math.sin(67.5*(Math.PI / 180)) * r2;

      vm.starCoords = [
        { x: vm.center, y: vm.center - r1 },
        { x: vm.center + x2, y: vm.center - y2 },
        { x: vm.center + x1, y: vm.center - y1 },
        { x: vm.center + y2, y: vm.center - x2 },
        { x: vm.center + r1, y: vm.center },
        { x: vm.center + y2, y: vm.center + x2 },
        { x: vm.center + x1, y: vm.center + y1 },
        { x: vm.center + x2, y: vm.center + y2 },
        { x: vm.center, y: vm.center + r1 },
        { x: vm.center - x2, y: vm.center + y2 },
        { x: vm.center - x1, y: vm.center + y1 },
        { x: vm.center - y2, y: vm.center + x2 },
        { x: vm.center - r1, y: vm.center },
        { x: vm.center - y2, y: vm.center - x2 },
        { x: vm.center - x1, y: vm.center - y1 },
        { x: vm.center - x2, y: vm.center - y2 }
      ];

      vm.emblemRectCoords = [
        { x: vm.xPadding, y: 0 },
        { x: vm.width - vm.xPadding, y: 0 },
        { x: vm.width - vm.xPadding, y: vm.center },
        { x: vm.xPadding, y: vm.center }
      ];

      vm.coordsToString = function (coords) {
        return vm[coords].map(function(obj) {
          return obj.x + ',' + obj.y;
        }).join(' ')
      };
    }
  }

})();
