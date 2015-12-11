appInstaller.controller('AppsController', function($scope, Applications, profileService) {

  Applications.getAll().then(function(response){
    $scope.apps = response.data;
  });

  var profile = profileService.getCurrentProfile();
  profileService.bind($scope);

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
