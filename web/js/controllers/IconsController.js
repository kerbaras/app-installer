appInstaller.controller('IconsController', function($scope, Icons) {

  $scope.icons = null;
  Icons.getAll().then(function(response){
    $scope.icons = response.data;
  });

  $scope.selected = [];

  $scope.toggle = function (icon) {
    var idx = $scope.selected.indexOf(icon.id);
    if (idx > -1) $scope.selected.splice(idx, 1);
    else $scope.selected.push(icon.id);
  };

  $scope.exists = function (icon) {
    return $scope.selected.indexOf(icon.id) > -1;
  };
});
