appInstaller.service('Icons', function($resource) {
  this.getAll = function () {
      var iconService = $resource('js/data/icons.json');
      return iconService.get().$promise;
  };
});
