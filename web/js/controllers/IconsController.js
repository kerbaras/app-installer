appInstaller.controller('IconsController', function($scope, Icons, localStorageService) {

  $scope.icons = null;
  Icons.getAll().then(function(response){
    $scope.icons = response.data;
  });

  var profile = localStorageService.get('profile');
  if (profile == null) profile = 'default';

  if(localStorageService.get('profiles') == null){
    localStorageService.set('profiles', {
      'default' : {
        'apps' : [],
        'themes' : [],
        'icons' : [],
        'scripts' : []
      }
    });
  }

  localStorageService.bind($scope, 'profiles');

  $scope.toggle = function (icon) {
    var idx = $scope.profiles[profile].icons.indexOf(icon.id);
    if (idx > -1) $scope.profiles[profile].icons.splice(idx, 1);
    else $scope.profiles[profile].icons.push(icon.id);
  };

  $scope.exists = function (icon) {
    return $scope.profiles[profile].icons.indexOf(icon.id) > -1;
  };

  $scope.selectAll = function () {
    $scope.icons.forEach(function (element){
      if($scope.profiles[profile].icons.indexOf(icon.id) == -1)
        $scope.profiles[profile].icons.push(icon.id);
    });
  };

  $scope.disableAll = function () {
    $scope.icons.forEach(function (element){
      var idx = $scope.profiles[profile].icons.indexOf(icon.id);
      if(idx > -1) $scope.profiles[profile].icons.splice(idx, 1);
    });
  };
});
