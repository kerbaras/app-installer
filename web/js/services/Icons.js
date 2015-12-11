appInstaller.service('Icons', function($resource) {
  this.getAll = function () {
      var iconService = $resource('bower_components/hexeract-data-layer/icons.json');
      return iconService.get().$promise;
  };
});
