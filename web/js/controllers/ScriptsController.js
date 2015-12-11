appInstaller.controller('ScriptsController', function($scope, Scripts, profileService) {

  Scripts.getAll().then(function(response){
    $scope.scripts = response.data;
  });

  var profile = profileService.getCurrentProfile();
  profileService.bind($scope);

  $scope.toggle = function (script) {
    var idx = $scope.profiles[profile].scripts.indexOf(script.id);
    if (idx > -1) $scope.profiles[profile].scripts.splice(idx, 1);
    else $scope.profiles[profile].scripts.push(script.id);
  };

  $scope.exists = function (script) {
    return $scope.profiles[profile].scripts.indexOf(script.id) > -1;
  };

  $scope.selectAll = function () {
    $scope.scripts.forEach(function (element){
      if($scope.profiles[profile].scripts.indexOf(script.id) == -1)
        $scope.profiles[profile].scripts.push(script.id);
    });
  };

  $scope.disableAll = function () {
    $scope.scripts.forEach(function (element){
      var idx = $scope.profiles[profile].scripts.indexOf(script.id);
      if(idx > -1) $scope.profiles[profile].scripts.splice(idx, 1);
    });
  };
});
