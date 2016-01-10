appInstaller.controller('AppsController', function($scope, Applications, profileService) {

  Applications.getAll().then(function(response){
    //expected [{"id": int,"nombre": String,"descr": String,"logo":String}...]
    $scope.apps = response.data;
  });

  $scope.toggle = function (app) {
    var idx = $scope.$parent.profiles[$scope.$parent.profile].apps.indexOf(app.id);
    if (idx > -1) $scope.$parent.profiles[$scope.$parent.profile].apps.splice(idx, 1);
    else $scope.$parent.profiles[$scope.$parent.profile].apps.push(app.id);
  };

  $scope.exists = function (app) {
    return $scope.$parent.profiles[$scope.$parent.profile].apps.indexOf(app.id) > -1;
  };

  //NOTE @REVIEW Replace forEach by Angular.forEach
  $scope.selectAll = function () {
    angular.forEach($scope.apps,function(app,key){
      if($scope.$parent.profiles[$scope.$parent.profile].apps.indexOf(app.id) == -1)
        $scope.$parent.profiles[$scope.$parent.profile].apps.push(app.id);
    });
  };

  //NOTE @REVIEW Replace forEach by Angular.forEach
  $scope.disableAll = function () {
    $scope.$parent.profiles[$scope.$parent.profile].apps = [];
  };

});
