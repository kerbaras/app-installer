appInstaller.service('Applications', function($resource) {
  this.getAll = function () {
      var appService = $resource('js/data/apps.json');
      return appService.get().$promise;
  };
});
