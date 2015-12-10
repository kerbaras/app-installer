appInstaller.controller('SettingsController', function($scope, localStorageService) {

  localStorageService.bind($scope, 'profiles');
  localStorageService.bind($scope, 'profile');

  if ($scope.profile == null) $scope.profile = 'default';

  $scope.newProfileName = '';

  $scope.onKeyPress = function (event) {
    if(event.keyCode === 13 && $scope.newProfileName.trim() != ''){
      if($scope.profiles[$scope.newProfileName] == null){
        $scope.profiles[$scope.newProfileName] = {
          'apps' : [],
          'themes' : [],
          'icons' : [],
          'scripts' : []
        };
        $scope.profile = $scope.newProfileName;
        $scope.newProfileName = '';
      }
    }
  };

  $scope.deleteProfile = function () {
    if($scope.profile == 'default'){
      $scope.profiles.default = {
        'apps' : [],
        'themes' : [],
        'icons' : [],
        'scripts' : []
      };
    }else{
      delete $scope.profiles[$scope.profile];
      $scope.profile = 'default';
    }
  };

  $scope.clearProfiles = function () {
    $scope.profiles = {
      'default' : {
        'apps': [],
        'themes': [],
        'icons': [],
        'scripts': [],
      }
    };
    $scope.profile = 'default';
  }

});
