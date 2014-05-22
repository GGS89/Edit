<<<<<<< HEAD
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
=======
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
>>>>>>> 873cb157f585e2b145a68704bf78365d3b2e6553
