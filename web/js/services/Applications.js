appInstaller.factory('Applications', function($resource, $q) {
  var appService;
  return {
    getAll: function() {
      if (!appService) {
        appService = $resource('bower_components/hexeract-data-layer/apps.json')
        .get();
      }
      return appService.$promise;
    },
    get: function(ids) {
      var deferred = $q.defer();

      this.getAll().then(function(response) {
        var applications = response.data.filter(function(app) {
          return (ids.indexOf(app.id) > -1);
        });
        if (applications.length > 0)
          deferred.resolve(applications);
        else
          deferred.reject({
            'error': {
              status: 'Not Found'
            }
          });
      });
      return deferred.promise;
    }
  };
});
