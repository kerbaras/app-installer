appInstaller.controller('IconsController', function($scope, Icons, profileService) {

  Icons.getAll().then(function(response){
    $scope.icons = response.data;
  });

  var profile = profileService.getCurrentProfile();
  profileService.bind($scope);

  $scope.toggle = function (icon) {
    var idx = $scope.profiles[profile].icons.indexOf(icon.id);
    if (idx > -1) $scope.profiles[profile].icons.splice(idx, 1);
    else $scope.profiles[profile].icons.push(icon.id);
  };

  $scope.exists = function (icon) {
    return $scope.profiles[profile].icons.indexOf(icon.id) > -1;
  };

  $scope.selectAll = function () {
    angular.forEach($scope.icons,function(icon,key){
      if($scope.profiles[profile].icons.indexOf(icon.id) == -1)
        $scope.profiles[profile].icons.push(icon.id);
    });
  };

  $scope.disableAll = function () {
    $scope.profiles[profile].icons = [];
  };
});
