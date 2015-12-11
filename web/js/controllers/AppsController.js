appInstaller.controller('AppsController', function($scope, Applications, localStorageService) {

  //@REVIEW initialization not needed
  $scope.apps = null;
  Applications.getAll().then(function(response){
    //expected [{"id": int,"nombre": String,"descr": String,"logo":String}...]
    $scope.apps = response.data;
  });

  if(!localStorageService.get('profiles')){
    localStorageService.set('profiles', {
      'default' : {
        'apps' : [],
        'themes' : [],
        'icons' : [],
        'scripts' : []
      }
    });
  }
  var profile = localStorageService.get('profile') || 'default';

  localStorageService.bind($scope, 'profiles');

  $scope.toggle = function (app) {
    var idx = $scope.profiles[profile].apps.indexOf(app.id);
    if (idx > -1) $scope.profiles[profile].apps.splice(idx, 1);
    else $scope.profiles[profile].apps.push(app.id);
  };

  $scope.exists = function (app) {
    return $scope.profiles[profile].apps.indexOf(app.id) > -1;
  };
  //NOTE @REVIEW Replace forEach by Angular.forEach
  $scope.selectAll = function () {
    angular.forEach($scope.apps,function(val,key){
      if($scope.profiles[profile].apps.indexOf(app.id) == -1)
        $scope.profiles[profile].apps.push(app.id);
    });
  };
  //NOTE @REVIEW Replace forEach by Angular.forEach
  $scope.disableAll = function () {
    angular.forEach($scope.apps,function(val,key){
      var idx = $scope.profiles[profile].apps.indexOf(app.id);
      if(idx > -1) $scope.profiles[profile].apps.splice(idx, 1);
    });
  };

});
