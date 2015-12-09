appInstaller.controller('ScriptsController', function($scope, Scripts) {

  $scope.scripts = null;
  Scripts.getAll().then(function(response){
    $scope.scripts = response.data;
  });

  $scope.selected = [];

  $scope.toggle = function (script) {
    var idx = $scope.selected.indexOf(script.id);
    if (idx > -1) $scope.selected.splice(idx, 1);
    else $scope.selected.push(script.id);
  };

  $scope.exists = function (script) {
    return $scope.selected.indexOf(script.id) > -1;
  };
});
