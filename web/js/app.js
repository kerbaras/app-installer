var appInstaller = angular.module('app-installer', ['ngRoute','ngMaterial','ngAnimate', 'ngResource', 'sun.scrollable']);

appInstaller.config(function($mdThemingProvider, $routeProvider, $resourceProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('pink')
    .warnPalette('blue-grey');

  $resourceProvider.defaults.stripTrailingSlashes = false;
  $routeProvider.
      when('/dashboard', {
        templateUrl: 'js/templates/dashboard.html',
        controller: 'DashboardController'
      })
      .when('/settings', {
        templateUrl: 'js/templates/settings.html'
      })
      .when('/faq', {
        templateUrl: 'js/templates/faq.html',
        controller: 'FAQController'
      })
      .when('/about', {
        templateUrl: 'js/templates/about.html',
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
});
