(function() {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    String.prototype.removeLast = function() {
      return this.substring(0, this.length - 1);
    };

    $log.debug('runBlock end');
  }

})();
