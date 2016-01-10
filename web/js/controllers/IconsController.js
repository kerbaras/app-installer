appInstaller.controller('IconsController', function($scope, Icons, profileService) {

  Icons.getAll().then(function(response){
    $scope.icons = response.data;
  });

  $scope.toggle = function (icon) {
    var idx = $scope.$parent.profiles[$scope.$parent.profile].icons.indexOf(icon.id);
    if (idx > -1) $scope.$parent.profiles[$scope.$parent.profile].icons.splice(idx, 1);
    else $scope.$parent.profiles[$scope.$parent.profile].icons.push(icon.id);
  };

  $scope.exists = function (icon) {
    return $scope.$parent.profiles[$scope.$parent.profile].icons.indexOf(icon.id) > -1;
  };

  $scope.selectAll = function () {
    angular.forEach($scope.icons,function(icon,key){
      if($scope.$parent.profiles[$scope.$parent.profile].icons.indexOf(icon.id) == -1)
        $scope.$parent.profiles[$scope.$parent.profile].icons.push(icon.id);
    });
  };

  $scope.disableAll = function () {
    $scope.$parent.profiles[$scope.$parent.profile].icons = [];
  };
});
