appInstaller.controller('SettingsController', function($scope, profileService) {

  profileService.bind($scope, true);

  if (!$scope.profile) $scope.profile = 'default';

  $scope.newProfileName = '';

  $scope.onKeyPress = function (event) {
    if(event.keyCode === 13){
      profileService.addProfile($scope, $scope.newProfileName);
    }
  };

  $scope.deleteProfile = function () {
      profileService.deleteProfile($scope);
  };

  $scope.clearProfiles = function () {
      profileService.clearProfiles($scope);
  }

});
