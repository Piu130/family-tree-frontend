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
        return '- ' + unit;
      }

      return input + unit;
    };
  }
})();
