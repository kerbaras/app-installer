appInstaller.controller('AppsController', function($scope, Applications) {
  $scope.apps = null;
  Applications.getAll().then(function(response){
    $scope.apps = response.data;
  });
});
