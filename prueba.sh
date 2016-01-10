#!/bin/bash

# Create a secure tmp directory
tmp=$(mktemp -d -t hexeract.XXXXXXXXXX)

# Checks if the system is 64bit or 32bit
[[ $(uname -m) == x86_64 ]] && arch=amd64 || arch=i386

if [ $(tput colors) ]; then # Checks if terminal supports colors
	red="\e[31m"
	green="\e[32m"
	endcolor="\e[39m"
fi


echo " "
echo "Installing-U Pacifica"
echo " "
(
	sudo -s <<HEXERACT
	wget http://fc00.deviantart.net/fs71/f/2013/305/9/6/pacifica_icons_by_bokehlicia-d6nn5lb.zip -O $tmp/pacifica.zip
	unzip $tmp/pacifica.zip -d $tmp
	mv $tmp/Pacifica /usr/share/icons/
	mv $tmp/Pacifica-U /usr/share/icons/
HEXERACT
) && echo -e "[ $green Done! $endcolor ]" || echo -e "[ $red Failed $endcolor ]"

echo " "
echo "Installing Numix-uTouch"
echo " "
(
	sudo -s <<HEXERACT
	apt-get install -y git
	git clone https://github.com/numixproject/numix-icon-theme-utouch.git $tmp/utouch
	mv $tmp/utouch/Numix-uTouch /usr/share/icons/
HEXERACT
) && echo -e "[ $green Done! $endcolor ]" || echo -e "[ $red Failed $endcolor ]"

echo " "
echo "Installing Flattr"
echo " "
(
	sudo -s <<HEXERACT
	wget https://github.com/NitruxSA/flattr-icons/archive/master.zip -O $tmp/flattr.zip && unzip $tmp/flattr.zip -d $tmp && mv $tmp/flattr-icons-master/Flattr /usr/share/icons
HEXERACT
) && echo -e "[ $green Done! $endcolor ]" || echo -e "[ $red Failed $endcolor ]"

exit 0
