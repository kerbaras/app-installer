appInstaller.service('Themes', function($resource) {
  this.getAll = function () {
      var themeService = $resource('js/data/themes.json');
      return themeService.get().$promise;
  };
});
