var pationApp = angular.module('pation', []);


angular.module('pation', []).
  config(['$routeProvider', 
  function($routeProvider) {
    $routeProvider.
        when('/edit', {
          templateUrl: 'views/edit.html',
          controller: editController}).
        otherwise({
          redirectTo: '/'
        });
  }]);
