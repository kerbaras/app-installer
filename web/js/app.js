var appInstaller = angular.module('app-installer', ['ngRoute','ngMaterial','ngAnimate']);

appInstaller.config(function($mdThemingProvider, $routeProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('pink')
    .warnPalette('blue-grey');

  $routeProvider.
      when('/dashboard', {
        templateUrl: 'js/templates/dashboard.html',
        controller: 'DashboardController'
      })
      .when('/settings', {
        templateUrl: 'js/templates/icons.html',
        controller: 'IconsController'
      })
      .otherwise({
        redirectTo: '/dashboard'
      });
});


var nice = $("html").niceScroll();

(function () {

      var remote = require('remote');
      var BrowserWindow = remote.require('browser-window');

     function init() {
          /*document.getElementById("min-btn").addEventListener("click", function (e) {
               var window = BrowserWindow.getFocusedWindow();
               window.minimize();
          });*/

          document.getElementById("maxBtn").addEventListener("click", function (e) {
               var window = BrowserWindow.getFocusedWindow();
               window.maximize();
          });

          document.getElementById("closeBtn").addEventListener("click", function (e) {
               var window = BrowserWindow.getFocusedWindow();
               window.close();
          });
     };

     document.onreadystatechange = function () {
          if (document.readyState == "complete") {
               init();
          }
     };

})();
