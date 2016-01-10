appInstaller.service('InstallerFactory', function($q, Applications, Icons, Themes) {
  var normalize = function(string) {
    string = string.toLowerCase();
    string = string.replace(/[&\/\\#,\+\(\)\$\~\%.'"\:\*\?<>\{\}]/g, '');
    string = string.replace(/\s+/g, '-');
    return string;
  };

  this.getInstaller = function(profile, distro, settings) {

    settings = angular.extend({}, settings);

    var appsDefer = $q.defer();
    var iconsDefer = $q.defer();
    var themesDefer = $q.defer();
    var promises = [appsDefer.promise, iconsDefer.promise, themesDefer.promise];

    if (profile.apps && profile.apps > 0) {
      Applications.get(profile.apps).then(function(apps) {
        var repos = install = postInstall = "";
        install +=  "\n" +
                    "\n" +
                    "echo \"\"\n" +
                    "echo \"\"\n" +
                    "echo \"Installing Applications\"\n" +
                    "echo \"\"\n" +
                    "\n";
        angular.forEach(apps, function(app) {
          var setup = app.distros[distro];
          install += "echo \"Installing " + app.nombre + "\" \n";
          install += "(\n";
          switch (setup.type) {
            case 'ppa':
              repos += "\tapt-add-repository " + setup.repository + " -y\n";
              install += "\tapt-get -y install " + setup.package + "\n";
              break;
            case 'pkey':
              repos += "\twget -q -O - " + setup.package.key + " | sudo apt-key add -\n";
              repos += "\techo \"deb " + setup.package.url + " " + setup.package.version + "\" > /etc/apt/sources.list.d/" + normalize(app.nombre) + ".list\n";
              install += "\tapt-get -y install " + setup.package.name + "\n";
              break;
            case 'apt':
              install += "\tapt-get -y install " + setup.package + "\n";
              break;
            default:
              setup.repos = (setup.repos) ? [].concat(setup.repos) : [];
              setup.install = (setup.install) ? [].concat(setup.install) : [];
              setup.postInstall = (setup.postInstall) ? [].concat(setup.postInstall) : [];

              angular.forEach(setup.repos, function(cmd) {
                repos += "\t" + cmd + "\n";
              });

              angular.forEach(setup.install, function(cmd) {
                install += "\t" + cmd + "\n";
              });

              angular.forEach(setup.postInstall, function(cmd) {
                postInstall += "\t" + cmd + "\n";
              });
          }

          install += ") &> /dev/null && echo -e \"$green OK $endcolor\" || echo -e \"$red FAILED $endcolor\"; # Hide all output\n";
          install += "\n";
        });
        appsDefer.resolve({
          repos: repos,
          install: install,
          postInstall: postInstall
        });
      });
    } else {
      appsDefer.resolve({
        repos: '',
        install: '',
        postInstall: ''
      });
    }

    if (profile.icons && profile.icons > 0) {
      Icons.get(profile.icons).then(function(icons) {
        var repos = install = postInstall = "";
        install +=  "\n" +
                    "\n" +
                    "echo \"\"\n" +
                    "echo \"\"\n" +
                    "echo \"Installing Icons\"\n" +
                    "echo \"\"\n" +
                    "\n";
        angular.forEach(icons, function(icon) {
          install += "echo \"Installing " + icon.name + "\" \n";
          install += "(\n";
          switch (icon.type) {
            case 'ppa':
              repos += "\tapt-add-repository " + icon.repository + " -y\n";
              install += "\tapt-get -y install " + icon.package + "\n";
              break;
            default:
              icon.repos = (icon.repos) ? [].concat(icon.repos) : [];
              icon.install = (icon.install) ? [].concat(icon.install) : [];
              icon.postInstall = (icon.postInstall) ? [].concat(icon.postInstall) : [];

              angular.forEach(icon.repos, function(cmd) {
                repos += "\t" + cmd + "\n";
              });

              angular.forEach(icon.install, function(cmd) {
                install += "\t" + cmd + "\n";
              });

              angular.forEach(icon.postInstall, function(cmd) {
                postInstall += "\t" + cmd + "\n";
              });
          };

          install += ") &> /dev/null && echo -e \"$green OK $endcolor\" || echo -e \"$red FAILED $endcolor\"; # Hide all output\n";
          install += "\n";
        });
        iconsDefer.resolve({
          repos: repos,
          install: install,
          postInstall: postInstall
        });
      });
    } else {
      iconsDefer.resolve({
        repos: '',
        install: '',
        postInstall: ''
      });
    }

    if (profile.themes && profile.themes > 0) {
      Themes.get(profile.themes).then(function(themes) {
        var repos = install = postInstall = "";
        install +=  "\n" +
                    "\n" +
                    "echo \"\"\n" +
                    "echo \"\"\n" +
                    "echo \"Installing Themes\"\n" +
                    "echo \"\"\n" +
                    "\n";
        angular.forEach(themes, function(theme) {
          install += "echo \"Installing " + theme.name + "\" \n";
          install += "(\n";
          switch (theme.type) {
            case 'ppa':
              repos += "\tapt-add-repository " + theme.repository + " -y\n";
              install += "\tapt-get -y install " + theme.package + "\n";
              break;
            default:
              theme.repos = (theme.repos) ? [].concat(theme.repos) : [];
              theme.install = (theme.install) ? [].concat(theme.install) : [];
              theme.postInstall = (theme.postInstall) ? [].concat(theme.postInstall) : [];

              angular.forEach(theme.repos, function(cmd) {
                repos += "\t" + cmd + "\n";
              });

              angular.forEach(theme.install, function(cmd) {
                install += "\t" + cmd + "\n";
              });

              angular.forEach(theme.postInstall, function(cmd) {
                postInstall += "\t" + cmd + "\n";
              });
          };

          install += ") &> /dev/null && echo -e \"$green OK $endcolor\" || echo -e \"$red FAILED $endcolor\"; # Hide all output\n";
          install += "\n";
        });
        themesDefer.resolve({
          repos: repos,
          install: install,
          postInstall: postInstall
        });
      });
    } else {
      themesDefer.resolve({
        repos: '',
        install: '',
        postInstall: ''
      });
    }

    var deferred = $q.defer();

    $q.all(promises).then(function(results) {
      var body = repos = install = postInstall = "";
      angular.forEach(results, function(result) {
        repos += result.repos;
        install += result.install;
        postInstall += result.postInstall;
      });

      body = "#!/bin/bash\n" +
             "clear\n" +
             "\n";

      body += "# Create a secure tmp directory\n" +
              "tmp=$(mktemp -d -t hexeract.XXXXXXXXXX)\n" +
              "\n";

      body += "# Checks if the system is 64bit or 32bit\n" +
              "[[ $(uname -m) == x86_64 ]] && arch=amd64 || arch=i386\n" +
              "\n";

      body += "if [ $(tput colors) ]; then # Checks if terminal supports colors\n" +
                "\tred=\"\\e[31m\"\n" +
                "\tgreen=\"\\e[32m\"\n" +
                "\tendcolor=\"\\e[39m\"\n" +
              "fi\n" +
              "\n";

      body += "echo --------------------------------------------------------------------------------\n" +
              "echo \"We are not responsible for any damages that may possibly occur while using Hexeract\"\n" +
              "echo --------------------------------------------------------------------------------\n" +
              "echo \"   \"\n" +
              "sleep 2\n" +
              "\n";

      body += "#use sudo rights for the whole script\n" +
              "sudo -s <<HEXERACT\n" +
              "\n" +
              "clear\n" +
              "\n" +
              "echo ------------------\n" +
              "echo \"Welcome to Hexeract!\"\n" +
              "echo ------------------\n" +
              "echo \"   \"\n" +
              "sleep 2\n" +
              "\n";

      body += "trap \"rm -rf $tmp\" INT TERM EXIT\n\n";

      if(repos != ""){
        body += "# Add all the repositories\n"+
                "echo \"Adding Repositories\" \n"+
                "(\n"+
                repos +
                ") &> /dev/null && echo -e \"$green OK $endcolor\" || echo -e \"$red FAILED $endcolor\"; # Hide all output\n"+
                "\n";
      }

      body += "echo \"Updating System\" \n" +
              "(\n" +
                "\tapt-get update\n" +
              ") &> /dev/null && echo -e \"$green OK $endcolor\" || echo -e \"$red FAILED $endcolor\"; # Hide all output\n" +
              "\n";

      if(install != ""){
        body += install +
                "\n";
      }

      body += "echo \"Upgrading old packages\"\n" +
              "(\n" +
              "\tapt-get -f install -y \n";

      if(settings.upgrade) {
        body += "\tapt-get -y upgrade\n";
      }

      if(settings.distUpgrade) {
        body += "\tapt-get -y dist-upgrade\n";
      }

      body += ") &> /dev/null && echo -e \"$green OK $endcolor\" || echo -e \"$red FAILED $endcolor\"; # Hide all output\n" +
              "\n";

      body += "echo \"Cleaning up\"\n" +
              "(\n" +
                "\tapt-get -y autoremove \n" +
                "\tapt-get -y autoclean \n" +
                "\tapt-get -y clean\n" +
              ") &> /dev/null && echo -e \"$green OK $endcolor\" || echo -e \"$red FAILED $endcolor\"; # Hide all output\n" +
              "\n";

      body += "HEXERACT\n" +
              "\n";


      if (postInstall != "") {
        body += "\n" +
                "echo \"Running Post-Install\"\n" +
                "(\n" +
                  postInstall +
                ") &> /dev/null && echo -e \"$green OK $endcolor\" || echo -e \"$red FAILED $endcolor\"; # Hide all output\n" +
                "\n";
      }

      body += "\n" +
              "notify-send \"Hexeract\" \"Finished installing\"\n" +
              "\n" +
              "exit 0\n";

      deferred.resolve(body);
    });

    return deferred.promise;
  };
});
