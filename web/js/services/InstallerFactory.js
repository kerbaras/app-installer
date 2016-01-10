appInstaller.service('InstallerFactory', function($q, Applications, Icons, Themes) {
  var normalize = function(string) {
    string = string.toLowerCase();
    string = string.replace(/[&\/\\#,\+\(\)\$\~\%.'"\:\*\?<>\{\}]/g, '');
    string = string.replace(/\s+/g, '-');
    return string;
  };

  var processAplications = function(apps) {
    var defer = $q.defer();
    if (profile.apps && profile.apps.length > 0) {
      Applications.get(apps).then(function(apps) {
        var repos = install = postInstall = "";
        install += "\n" +
          "\n" +
          "echo \"\"\n" +
          "echo \"\"\n" +
          "echo \"Installing Applications\"\n" +
          "echo \"\"\n" +
          "\n";
        angular.forEach(apps, function(app) {
          var setup = app.distros[distro];
          install += "echo \"Installing " + app.nombre + "\"\n";
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
        defer.resolve({
          repos: repos,
          install: install,
          postInstall: postInstall
        });
      });
    } else {
      defer.resolve({
        repos: '',
        install: '',
        postInstall: ''
      });
    }
    return defer.promise;
  };

  var processIcons = function(icons) {
    var defer = $q.defer();
    if (icons && icons.length > 0) {
      Icons.get(profile.icons).then(function(icons) {
        var repos = install = postInstall = "";
        install += "\n" +
          "\n" +
          "echo \"\"\n" +
          "echo \"\"\n" +
          "echo \"Installing Icons\"\n" +
          "echo \"\"\n" +
          "\n";
        angular.forEach(icons, function(icon) {
          install += "echo \"Installing " + icon.name + "\"\n";
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
      defer.resolve({
        repos: '',
        install: '',
        postInstall: ''
      });
    }
    return defer.promise;
  };

  var processThemes = function(themes) {
    var defer = $q.defer();
    if (themes && themes.length > 0) {
      Themes.get(profile.themes).then(function(themes) {
        var repos = install = postInstall = "";
        install += "\n" +
          "\n" +
          "echo \"\"\n" +
          "echo \"\"\n" +
          "echo \"Installing Themes\"\n" +
          "echo \"\"\n" +
          "\n";
        angular.forEach(themes, function(theme) {
          install += "echo \"Installing " + theme.name + "\"\n";
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
      defer.resolve({
        repos: '',
        install: '',
        postInstall: ''
      });
    }
    return defer.promise;
  };

  var processScripts = function(scripts) {
    var defer = $q.defer();
    if (scripts && scripts.length > 0) {

    } else {
      defer.resolve({
        repos: '',
        install: '',
        postInstall: ''
      });
    }
    return defer.promise;
  };

  var getScriptFunctions = function() {
    return "display_sep ()\n" +
            "{\n" +
            "\tprintf \"%*s\\n\" $(tput cols) | tr \" \" \"=\"\n" +
            "}\n" +
            "\n" +
            "display_header ()\n" +
            "{\n" +
            "\tdisplay_sep\n" +
            "\tcols=$(tput cols)\n" +
            "\tprintf \"%*s\\n\" $(( (${#1}+$cols) / 2 )) \"$1\"\n" +
            "\tdisplay_sep\n" +
            "}\n" +
            "\n" +
            "display_row ()\n" +
            "{\n" +
            "\tif [ -z \"$5\" ]; then\n" +
            "\t\tspace=0\n" +
            "\telse\n" +
            "\t\tspace=$((${#2}-${#5}))\n" +
            "\tfi\n" +
            "\tnum=$((($(tput cols)-${#1})-5+$space))\n" +
            "\tprintf \"$3 # | %s%*b${4:-\\n}\" \"$1\" $num \"$2 | # \"\n" +
            "}\n" +
            "\n" +
            "display_rowloader ()\n" +
            "{\n" +
            "\tsmnt=1\n" +
            "\tsp='|/—\\'\n" +
            "\twhile ps |grep $! &>/dev/null; do\n" +
            "\t\t((smnt++))\n" +
            "\t\tif [ \"${sp:$smnt%${#sp}:1}\" = \"${sp:2:1}\" ]; then\n" +
            "\t\t\tdisplay_row \"$setup\" \"[  ${sp:smnt%${#sp}:1}  ]\" '\\b' '\\r' \"[   ]\"\n" +
            "\t\telse\n" +
            "\t\t\tdisplay_row \"$setup\" \"[  ${sp:smnt%${#sp}:1}  ]\" '\\b' '\\r'\n" +
            "\t\tfi\n" +
            "\t\tsleep 0.1\n" +
            "\tdone\n" +
            "}\n" +
            "\n" +
            "display_done ()\n" +
            "{\n" +
            "\tdisplay_row \"$setup\" \"[ $green ✔ $endcolor ]\" '\\b' '\\r' \"[  ✔  ]\"\n" +
            "\tprintf \"\\b\\n\";\n" +
            "}\n" +
            "\n" +
            "display_error ()\n" +
            "{\n" +
            "\tdisplay_row \"$setup\" \"[ $red ✘ $endcolor ]\" '\\b' '\\r' \"[  ✘  ]\"\n" +
            "\tprintf \"\\b\\n\";\n" +
            "}\n" +
            "\n" +
            "display_screen ()\n" +
            "{\n" +
            "\tclear\n" +
            "\tdisplay_header \"$1\"\n" +
            "}\n";
  };

  this.getInstaller = function(profile, distro, settings) {

    settings = angular.extend({}, settings);

    var deferred = $q.defer();

    $q.all([
        processAplications(profile.apps),
        processIcons(profile.icons),
        processThemes(profile.themes)
      ])
      .then(function(results) {
        var body = repos = install = postInstall = "";

        angular.forEach(results, function(result) {
          repos += result.repos;
          install += result.install;
          postInstall += result.postInstall;
        });

        body = "#!/bin/bash\n" +
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

        body += getScriptFunctions() +
          "\n";

        body += "display_screen \"We are not responsible for any damages that may possibly occur while using Hexeract!\"" +
          "sleep 2\n" +
          "\n" +
          "display_screen \"Welcome to Hexeract!\"\n";

        body += "trap \"rm -rf $tmp\" INT TERM EXIT\n\n";

        body += "display_row \" \"\n" +
          "display_row \"Preparing Installation: \"\n" +
          "display_row \" \"\n";

        if (repos != "") {
          body += "setup=\"Adding Repositories\"\n" +
            "(\n" +
            "\tsudo -s <<<HEXERACT\n" +
            repos + "\n" +
            "\tHEXERACT\n" +
            ") &> /dev/null && display_done || display_error &\n" +
            "display_rowloader\n" +
            "\n";
        }

        body += "setup=\"Updateing System\"\n" +
          "(\n" +
          "\t sudo apt-get update\n" +
          ") &> /dev/null && display_done || display_error &\n" +
          "display_rowloader\n";

        if (install != "") {
          body += "display_row \" \"\n" +
            "display_row \" \"\n" +
            "display_row \"Starting Installation: \"\n" +
            "display_row \" \"\n" +
            install +
            "\n";
        }

        body += "display_row \" \"\n" +
          "display_row \" \"\n" +
          "display_row \"Updateing Packages: \"\n" +
          "display_row \" \"\n" +
          "\n" +
          "setup=\"Installing Failed Dependencies\"\n" +
          "(\n" +
          "\tsudo apt-get -f install -y\n" +
          ")  &> /dev/null && display_done || display_error &\n" +
          "display_rowloader\n" +
          "\n";

        if (settings.upgrade) {
          body += "setup=\"Upgradeing System\"\n" +
            "(\n" +
            "\tsudo apt-get upgrade -y\n" +
            ")  &> /dev/null && display_done || display_error &\n" +
            "display_rowloader\n" +
            "\n";
        }

        if (settings.upgrade) {
          body += "setup=\"Upgradeing Distribution\"\n" +
            "(\n" +
            "\tsudo apt-get dist-upgrade -y\n" +
            ")  &> /dev/null && display_done || display_error &\n" +
            "display_rowloader\n" +
            "\n";
        }

        body += "setup=\"Clearing Packages\"\n" +
          "(\n" +
          "\tsudo apt-get -y autoremove\n" +
          "\tsudo apt-get -y autoclean\n" +
          "\tsudo apt-get -y clean\n" +
          ")  &> /dev/null && display_done || display_error &\n" +
          "display_rowloader\n" +
          "\n" +
          "\n";

        if (postInstall != "") {
          body += "display_row \" \" \n " +
            "display_row \" \" \n " +
            "display_row \" \" \n " +
            "setup=\"Running Post-Install\" \n " +
            "( \n " +
            postInstall +
            ")  &> /dev/null && display_done || display_error & \n " +
            "display_rowloader \n " +
        }
        body += "display_row \" \" \n " +
          "display_row \" \" \n " +
          "display_row \"Installation has ended!\"" +
          "\n" +
          "notify-send \"Hexeract\" \"Finished installing\"\n" +
          "\n" +
          "exit 0"

        deferred.resolve(body);
      });

    return deferred.promise;
  };
});
