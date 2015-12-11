appInstaller.service('Scripts', function($resource) {
  this.getAll = function () {
      var scriptService = $resource('bower_components/hexeract-data-layer/scripts.json');
      return scriptService.get().$promise;
  };
});
