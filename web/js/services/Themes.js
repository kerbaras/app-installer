appInstaller.service('Themes', function($resource) {
  this.getAll = function () {
      var themeService = $resource('bower_components/hexeract-data-layer/themes.json');
      return themeService.get().$promise;
  };
});
