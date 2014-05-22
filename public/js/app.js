<<<<<<< HEAD
var pationApp = angular.module('pationApp', [
  'ngRoute',
  'phonecatAnimations',

  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/edit', {
        templateUrl: 'views/edit.html',
        controller: 'editController'
      }).
      when('/addPation', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
=======
var pationApp = angular.module('pationApp', [
  'ngRoute',
  'phonecatAnimations',

  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/edit', {
        templateUrl: 'views/edit.html',
        controller: 'editController'
      }).
      when('/addPation', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
>>>>>>> 873cb157f585e2b145a68704bf78365d3b2e6553
  }]);