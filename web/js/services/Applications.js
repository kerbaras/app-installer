appInstaller.factory('Applications', function($resource, $q) {
  var appService;
  return {
    getAll: function () {
        if(!appService){
          appService = $resource('bower_components/hexeract-data-layer/apps.json').get();
        }
        return appService.$promise;
    },
    get: function (id) {
      var deferred = $q.defer();

      this.getAll().then(function (response) {
        var application;
        angular.forEach(response.data, function (app) {
          if(app.id == id){
            application = app;
            return;
          }
        });
        if(application)
          deferred.resolve(application);
        else
          deferred.reject({
            'error' : {
              status: 'Not Found'
            }
          });
      });

      return deferred;
    }
  };
});
