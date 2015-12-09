appInstaller.controller('ThemesController', function($scope, Themes) {

  $scope.themes = null;
  Themes.getAll().then(function(response){
    $scope.themes = response.data;
  });

  $scope.selected = [];

  $scope.toggle = function (theme) {
    var idx = $scope.selected.indexOf(theme.id);
    if (idx > -1) $scope.selected.splice(idx, 1);
    else $scope.selected.push(theme.id);
  };

  $scope.exists = function (theme) {
    return $scope.selected.indexOf(theme.id) > -1;
  };
});
