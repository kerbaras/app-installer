appInstaller.controller('DashboardController', function($scope,$mdSidenav,$location,profileService){
  $scope.max = 4;
  $scope.hide = false;
  $scope.selectedIndex = 0;
  
  $scope.profile = profileService.getCurrentProfile();
  profileService.bind($scope);

  $scope.nextTab = function() {
    $scope.selectedIndex = ($scope.selectedIndex < $scope.max) ? $scope.selectedIndex + 1 : 0;
  };
  $scope.isHidden = function () {
    return ($scope.selectedIndex == $scope.max);
  }
});
