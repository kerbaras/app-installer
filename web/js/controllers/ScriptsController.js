appInstaller.controller('ScriptsController', function($scope, Scripts, localStorageService) {

  $scope.scripts = null;
  Scripts.getAll().then(function(response){
    $scope.scripts = response.data;
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
