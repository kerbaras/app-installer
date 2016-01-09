appInstaller.factory('Themes', function($resource, $q) {
  var themeService;
  return {
    getAll: function() {
      if (!themeService) {
        themeService = $resource('bower_components/hexeract-data-layer/themes.json')
        .get();
      }
      return themeService.$promise;
    },
    get: function(ids) {
      var deferred = $q.defer();

      this.getAll().then(function(response) {
        var themes = response.data.filter(function(theme) {
          return (ids.indexOf(theme.id) > -1);
        });
        if (themes.length > 0)
          deferred.resolve(themes);
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
