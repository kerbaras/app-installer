appInstaller.service('profileService', function(localStorageService) {
  var $this = this;
  this.getCurrentProfile = function (){
    var profile = localStorageService.get('profile');
    return (profile) ? profile : 'default';
  };

  this.getCurrentProfile = function (profile){
    localStorageService.set('profile', profile);
  };

  this.bind = function (scope, all = false) {
    if(!localStorageService.get('profiles')){
       $this.clearProfiles();
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
      delete scope.profiles[scope];
      scope.profile = 'default';
    }
  };

  this.clearProfiles = function () {
    scope.profiles = {
      'default' : {
        'apps': [],
        'themes': [],
        'icons': [],
        'scripts': [],
      }
    };
    scope.profile = 'default';
  }
