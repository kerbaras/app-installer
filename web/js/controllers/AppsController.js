appInstaller.controller('AppsController', function($scope, Applications) {

  $scope.apps = null;
  Applications.getAll().then(function(response){
    $scope.apps = response.data;
  });

  $scope.selected = [];

  $scope.toggle = function (app) {
    var idx = $scope.selected.indexOf(app.id);
    if (idx > -1) $scope.selected.splice(idx, 1);
    else $scope.selected.push(app.id);
  };

  $scope.exists = function (app) {
    return $scope.selected.indexOf(app.id) > -1;
  };
});
