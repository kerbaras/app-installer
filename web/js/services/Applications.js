appInstaller.service('Applications', function($resource) {
  this.getAll = function () {
      var appService = $resource('bower_components/hexeract-data-layer/apps.json');
      return appService.get().$promise;
  };
});
