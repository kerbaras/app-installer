appInstaller.service('Scripts', function($resource) {
  this.getAll = function () {
      var scriptService = $resource('js/data/scripts.json');
      return scriptService.get().$promise;
  };
});
