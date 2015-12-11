appInstaller.controller('AppsController', function($scope, Applications, localStorageService) {

  $scope.apps = null;
  Applications.getAll().then(function(response){
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
  var profile = localStorageService.get('profile');

  localStorageService.bind($scope, 'profiles');

  $scope.toggle = function (app) {
    var idx = $scope.profiles[profile].apps.indexOf(app.id);
    if (idx > -1) $scope.profiles[profile].apps.splice(idx, 1);
    else $scope.profiles[profile].apps.push(app.id);
  };

  $scope.exists = function (app) {
    return $scope.profiles[profile].apps.indexOf(app.id) > -1;
  };

  $scope.selectAll = function () {
    $scope.apps.forEach(function (element){
      if($scope.profiles[profile].apps.indexOf(app.id) == -1)
        $scope.profiles[profile].apps.push(app.id);
    });
  };

  $scope.disableAll = function () {
    $scope.apps.forEach(function (element){
      var idx = $scope.profiles[profile].apps.indexOf(app.id);
      if(idx > -1) $scope.profiles[profile].apps.splice(idx, 1);
    });
  };

});
