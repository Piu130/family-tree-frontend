/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .constant('apiHost', 'http://localhost:3000/api')
    .constant('rootMember', { firstName: 'Hans', lastName: 'Ramser' });

})();
