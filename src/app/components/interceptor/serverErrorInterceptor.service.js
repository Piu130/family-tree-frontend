(function () {
  'use strict';

  angular
    .module('familyTreeFrontend')
    .factory('serverErrorInterceptor', ServerErrorInterceptor);

  /** @ngInject */
  function ServerErrorInterceptor($q, $translate, growl, apiHost) {
    return {
      responseError: function (rejection) {
        if (rejection.config.url.startsWith(apiHost) && rejection.status >= 500) {
          growl.error($translate.instant('SERVER_ERROR'), {
            ttl: 3000,
            disableCountDown: true,
            disableIcons: true
          });
        }

        return $q.reject(rejection);
      }
    };
  }
})();

