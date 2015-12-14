appInstaller.service('profileService', function(localStorageService) {

  this.getCurrentProfile = function (){
    return localStorageService.get('profile') || 'default';
  };

  this.bind = function (scope, all) {
    if(!localStorageService.get('profiles')){
       localStorageService.set('profiles', {
         'default': {
           'apps' : [],
           'themes' : [],
           'icons' : [],
           'scripts' : []
         }
       });
    }

    localStorageService.bind(scope, 'profiles');
    if (all) localStorageService.bind(scope, 'profile');
  };

  this.addProfile = function (scope, profile) {
    if(profile.trim() != ''){
      if(scope.profiles[profile] == null){
        scope.profiles[profile] = {
          'apps' : [],
          'themes' : [],
          'icons' : [],
          'scripts' : []
        };
        scope.profile = profile;
      }
    }
  };

  this.deleteProfile = function (scope) {
    if(scope.profile == 'default'){
      scope.profiles.default = {
        'apps' : [],
        'themes' : [],
        'icons' : [],
        'scripts' : []
      };
    }else{
      delete scope.profiles[scope.profile];
      scope.profile = 'default';
    }
  };

  this.clearProfiles = function (scope) {
    scope.profiles = {
      'default' : {
        'apps': [],
        'themes': [],
        'icons': [],
        'scripts': [],
      }
    };
    scope.profile = 'default';
  };
});
