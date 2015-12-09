appInstaller.service('Profiles', function($window) {
  var $this = this;
  this.getDefaultProfile = function () {
      return {
        name: 'default',
        apps: [1,2],
        themes: [],
        icons: [],
        scripts: []
      };
  };

  this.getProfile = function (name) {
    var profiles = $window.localStorage.getItem('profiles');
    if(profiles == undefined){
      $window.localStorage.setItem('profiles', [ $this.getDefaultProfile() ]);
    }
    return profiles.forEach(function (profile, index){
      if(profile.name == name ){
        return profile;
      }
    });
  };

  this.getCurrentProfile = function () {
    var profile = $window.localStorage.getItem('profile');
    return (profile == undefined) ? $this.getProfile('default') : $this.getProfile(profile);
  };
});
