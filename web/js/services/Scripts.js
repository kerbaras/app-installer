appInstaller.factory('Scripts', function($resource, $q) {
  var scriptService;
  return {
    getAll: function() {
      if (!scriptService) {
        scriptService = $resource('bower_components/hexeract-data-layer/scripts.json')
        .get();
      }
      return scriptService.$promise;
    },
    get: function(ids) {
      var deferred = $q.defer();

      this.getAll().then(function(response) {
        var scripts = response.data.filter(function(script) {
          return (ids.indexOf(script.id) > -1);
        });
        if (scripts.length > 0)
          deferred.resolve(scripts);
        else
          deferred.reject({
            'error': {
              status: 'Not Found'
            }
          });
      });
      return deferred;
    }
  };
});
