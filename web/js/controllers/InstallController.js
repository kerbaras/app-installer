appInstaller.controller('InstallController', function($scope, Applications, Themes, Icons, Scripts, profileService) {
  var profile = profileService.getCurrentProfile();
  profileService.bind($scope);

  $scope.distro = 'Ubuntu';
  $scope.distros = ['Ubuntu']

  $scope.install = function () {
    var p = $scope.profiles[profile];
    var distro = $scope.distro;


    var repos, install, postInstall;



  };
});
