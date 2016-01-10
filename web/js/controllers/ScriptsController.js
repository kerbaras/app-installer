appInstaller.controller('ScriptsController', function($scope, Scripts, profileService) {

  Scripts.getAll().then(function(response){
    $scope.scripts = response.data;
  });

  $scope.toggle = function (script) {
    var idx = $scope.$parent.profiles[$scope.$parent.profile].scripts.indexOf(script.id);
    if (idx > -1) $scope.$parent.profiles[$scope.$parent.profile].scripts.splice(idx, 1);
    else $scope.$parent.profiles[$scope.$parent.profile].scripts.push(script.id);
  };

  $scope.exists = function (script) {
    return $scope.$parent.profiles[$scope.$parent.profile].scripts.indexOf(script.id) > -1;
  };

  $scope.selectAll = function () {
    angular.forEach($scope.scripts,function(script,key){
      if($scope.$parent.profiles[$scope.$parent.profile].scripts.indexOf(script.id) == -1)
        $scope.$parent.profiles[$scope.$parent.profile].scripts.push(script.id);
    });
  };

  $scope.disableAll = function () {
    $scope.$parent.profiles[$scope.$parent.profile].scripts = [];
  };
});
