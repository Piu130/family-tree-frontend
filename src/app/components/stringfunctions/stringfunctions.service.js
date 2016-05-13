(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('stringfunctionsService', stringfunctionsService);

  /** @ngInject */
  function stringfunctionsService() {

    return {
      initialize: initialize
    };

    function initialize() {
      String.prototype.removeLast = function () {
        return this.substring(0, this.length - 1);
      };
    }
  }
})();
