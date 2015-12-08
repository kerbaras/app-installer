appInstaller.controller('AppsController', function($scope, Applications, Profiles) {
  $scope.apps = null;
  Applications.getAll().then(function(response){
    $scope.apps = response.data;
  });

  $scope.profile = Profiles.getCurrentProfile();
});
