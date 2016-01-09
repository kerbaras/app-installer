appInstaller.factory('InstallerFactory', function($q, Applications, Icons) {
  var normalize = function(string) {
    string = string.toLowerCase();
    string = string.replace(/[&\/\\#,\+\(\)\$\~\%.'"\:\*\?<>\{\}]/g, '');
    string = string.replace(/\s+/g, '-');
    return string;
  }
  return {
    getInstaller: function(profile, distro, settings) {

      var appsDefer = $q.defer();
      var iconsDefer = $q.defer();
      var promises = [appsDefer.promise, iconsDefer.promise];

      Applications.get(profile.apps).then(function(apps) {
        var repos = install = postInstall = "";
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

      Icons.get(profile.icons).then(function(icons) {
        var repos = install = postInstall = "";
        install += "echo \"Installing Icons\"\n";
        install += "echo \" \"\n";
        install += "\n";
        angular.forEach(icons, function(icon) {
          install += "echo \"Installing " + icon.name + "\" \n";
          install += "(\n";
          switch (icon.type) {
            case 'ppa':
              repos += "\tapt-add-repository " + icon.repository + " -y\n";
              install += "\tapt-get -y install " + icon.package + "\n";
              break;
            case default:
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
        });
        iconsDefer.resolve({
          repos: repos,
          install: install,
          postInstall: postInstall
        });
      });

      var deferred = $q.defer();

      $q.all(promises).then(function(results) {
        var body = repos = install = postInstall = "";
        angular.forEach(results, function(result) {
          repos += result.repos;
          install += "\n" + result.install + "\n";
          postInstall += result.postInstall;
        });

        body = "#!/bin/bash\n";
        body += "clear\n";
        body += "\n";

        body += "# Create a secure tmp directory\n" +
                "tmp=$(mktemp -d -t hexeract.XXXXXXXXXX)\n"+
                "\n";

        body += "# Checks if the system is 64bit or 32bit\n" +
                "[[ $(uname -m) == x86_64 ]] && arch=amd64 || arch=i386\n" +
                "\n";

        body += "if [ $(tput colors) ]; then # Checks if terminal supports colors\n";
        body += "	red=\"\\e[31m\"\n";
        body += "	green=\"\\e[32m\"\n";
        body += "	endcolor=\"\\e[39m\"\n";
        body += "fi\n";
        body += "\n";

        body += "echo --------------------------------------------------------------------------------\n";
        body += "echo \"We are not responsible for any damages that may possibly occur while using Hexeract\"\n";
        body += "echo --------------------------------------------------------------------------------\n";
        body += "echo \"   \"\n";
        body += "sleep 2\n";
        body += "\n";

        body += "#use sudo rights for the whole script\n"
        body += "sudo -s <<HEXERACT\n";
        body += "\n";
        body += "clear\n";
        body += "\n";
        body += "echo ------------------\n";
        body += "echo \"Welcome to Hexeract!\"\n";
        body += "echo ------------------\n";
        body += "echo \"   \"\n";
        body += "sleep 2\n";
        body += "\n";

        body += "trap \"rm -rf $tmp\" EXIT\n\n";

        body += "# Add all the repositories\n";
        body += "echo \"Adding Repositories\" \n";
        body += "(\n";
        body += repos;
       body += ") &> /dev/null && echo -e \"$green OK $endcolor\" || echo -e \"$red FAILED $endcolor\"; # Hide all output\n";
        body += "\n";

        body += "echo \"Updating System\" \n";
        body += "(\n";
        body += "apt-get update\n";
        body += ") &> /dev/null && echo -e \"$green OK $endcolor\" || echo -e \"$red FAILED $endcolor\"; # Hide all output\n";
        body += "\n";

        body += install;
        body += "\n";

        body += "echo \"Upgrading old packages\"\n";
        body += "(\n";
        body += "apt-get -f install -y \n";
        body += "#apt-get -y upgrade\n";
        body += "#apt-get -y dist-upgrade\n";
        body += ") &> /dev/null && echo -e \"$green OK $endcolor\" || echo -e \"$red FAILED $endcolor\"; # Hide all output\n";
        body += "\n";

        body += "echo \"Cleaning up\"\n";
        body += "(\n";
        body += "apt-get -y autoremove \n";
        body += "apt-get -y autoclean \n";
        body += "apt-get -y clean\n";
        body += ") &> /dev/null && echo -e \"$green OK $endcolor\" || echo -e \"$red FAILED $endcolor\"; # Hide all output\n";
        body += "\n";

        body += "HEXERACT\n";
        body += "\n";


        if(postInstall != ""){
          body += "\n";
          body += "echo \"Running Post-Install\"\n";
          body += "(\n";
          body += postInstall;
          body += ") &> /dev/null && echo -e \"$green OK $endcolor\" || echo -e \"$red FAILED $endcolor\"; # Hide all output\n";
          body += "\n";
        }

        body += "\n";
        body += "notify-send \"Hexeract\" \"Finished installing\"\n";
        body += "\n";
        body += "exit 0\n";

        deferred.resolve(body);
      });

      return deferred.promise;
    }
  }
});
