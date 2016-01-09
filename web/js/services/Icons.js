appInstaller.factory('Icons', function($resource, $q) {
  var iconsService;
  return {
    getAll: function() {
      if (!iconsService) {
        iconsService = $resource('bower_components/hexeract-data-layer/icons.json')
        .get();
      }
      return iconsService.$promise;
    },
    get: function(ids) {
      var deferred = $q.defer();

      this.getAll().then(function(response) {
        var icons = response.data.filter(function(icons) {
          return (ids.indexOf(icons.id) > -1);
        });
        if (icons.length > 0)
          deferred.resolve(icons);
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
