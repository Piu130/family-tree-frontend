(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .filter('dash', dashFilter);

  /** @ngInject */
  function dashFilter() {
    return function(input, unit) {
      if(!unit) {
        unit = '';
      }

      if(!input) {
        return '-';
      }

      return input + unit;
    };
  }
})();
