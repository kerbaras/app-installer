appInstaller.controller('ThemesController', function($scope, Themes, profileService) {

  Themes.getAll().then(function(response){
    $scope.themes = response.data;
  });

  $scope.toggle = function (theme) {
    var idx = $scope.$parent.profiles[$scope.$parent.profile].themes.indexOf(theme.id);
    if (idx > -1) $scope.$parent.profiles[$scope.$parent.profile].themes.splice(idx, 1);
    else $scope.$parent.profiles[$scope.$parent.profile].themes.push(theme.id);
  };

  $scope.exists = function (theme) {
    return $scope.$parent.profiles[$scope.$parent.profile].themes.indexOf(theme.id) > -1;
  };

  $scope.selectAll = function () {
    angular.forEach($scope.themes,function(theme,key){
      if($scope.$parent.profiles[$scope.$parent.profile].themes.indexOf(theme.id) == -1)
        $scope.$parent.profiles[$scope.$parent.profile].themes.push(theme.id);
    });
  };

  $scope.disableAll = function () {
    $scope.$parent.profiles[$scope.$parent.profile].themes = [];
  };
});
