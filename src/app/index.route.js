(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
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
      .state('emblem', {
        url: '/emblem',
        templateUrl: 'app/emblem/emblem.html',
        controller: 'EmblemController',
        controllerAs: 'emblem'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController',
        controllerAs: 'admin'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
