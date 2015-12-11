appInstaller.controller('ThemesController', function($scope, Themes, profileService) {

  Themes.getAll().then(function(response){
    $scope.themes = response.data;
  });

  var profile = profileService.getCurrentProfile();
  profileService.bind($scope);

  $scope.toggle = function (theme) {
    var idx = $scope.profiles[profile].themes.indexOf(theme.id);
    if (idx > -1) $scope.profiles[profile].themes.splice(idx, 1);
    else $scope.profiles[profile].themes.push(theme.id);
  };

  $scope.exists = function (theme) {
    return $scope.profiles[profile].themes.indexOf(theme.id) > -1;
  };

  $scope.selectAll = function () {
    $scope.themes.forEach(function (element){
      if($scope.profiles[profile].themes.indexOf(theme.id) == -1)
        $scope.profiles[profile].themes.push(theme.id);
    });
  };

  $scope.disableAll = function () {
    $scope.themes.forEach(function (element){
      var idx = $scope.profiles[profile].themes.indexOf(theme.id);
      if(idx > -1) $scope.profiles[profile].themes.splice(idx, 1);
    });
  };
});
