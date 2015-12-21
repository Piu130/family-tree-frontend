(function() {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .constant('apiHost', 'http://localhost:3000/api')
    .constant('rootMember', { firstName: 'Max', lastName: 'Muster' });

})();
