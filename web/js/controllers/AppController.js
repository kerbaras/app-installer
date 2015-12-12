appInstaller.controller('AppController', function($scope,$mdSidenav,$location){
  var remote = require('remote');
  var BrowserWindow = remote.require('browser-window');
  var win = BrowserWindow.getFocusedWindow();

  $scope.menuItems = [
    { name:"Dashboard", icon: "home", url:"/dashboard" },
    { name:"Settings", icon: "settings", url:"/settings" },
    { name:"FAQ", icon: "question_answer", url:"/dashboard" },
    { name:"About Us", icon: "info", url:"/about" },
  ];

  $scope.toggleNav = function () {
    $mdSidenav('left').toggle();
  };

  $scope.go = function ( path ) {
    $location.path( path );
    $mdSidenav('left').toggle();
  };

  $scope.close = function () {
   win.close();
  }

  $scope.max = function () {
   if(win.isMaximized()){
     win.unmaximize();
   }else {
     win.maximize();
   }
  }

  $scope.maxIcon = function () {
    return (win.isMaximized()) ? 'fullscreen_exit' : 'fullscreen';
  }
});
