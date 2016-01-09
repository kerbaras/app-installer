var appInstaller = angular.module('app-installer', ['ngRoute', 'ngSanitize','ngMaterial','ngAnimate', 'ngResource', 'LocalStorageModule', 'sun.scrollable']);

appInstaller.config(function($mdThemingProvider, $routeProvider, $resourceProvider, localStorageServiceProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('pink')
    .warnPalette('indigo');

  localStorageServiceProvider
    .setPrefix('hexeract');

  $resourceProvider.defaults.stripTrailingSlashes = false;

  $routeProvider.
      when('/dashboard', {
        templateUrl: 'js/templates/dashboard.html',
        controller: 'DashboardController'
      })
      .when('/settings', {
        templateUrl: 'js/templates/settings.html',
        controller: 'SettingsController'
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
