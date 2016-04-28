(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .filter('dash', dashFilter);

  /** @ngInject */
  function dashFilter($translate) {
    return function(input, unit, space) {
      unit = unit || '';
      const inside = space ? ' ': '';

      if(!input) {
        return '-';
      }

      return input + inside + $translate.instant(unit);
    };
  }
})();
