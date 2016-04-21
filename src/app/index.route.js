(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tree', {
        url: '/',
        templateUrl: 'app/tree/tree.html',
        controller: 'TreeController',
        controllerAs: 'tree'
      })
      .state('person', {
        url: '/person/:id',
        templateUrl: 'app/person/person.html',
        controller: 'PersonController',
        controllerAs: 'person'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
