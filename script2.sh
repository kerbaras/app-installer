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

display_sep ()
{
	printf "%*s\n" $(tput cols) | tr " " "="
}

display_header ()
{
	display_sep
	cols=$(tput cols)
	printf "%*s\n" $(( (${#1}+$cols) / 2 )) "$1"
	display_sep
}

display_row ()
{
	if [ -z "$5" ]; then
		space=0
	else
		space=$((${#2}-${#5}))
	fi
	num=$((($(tput cols)-${#1})-5+$space))
	printf "$3 # | %s%*b${4:-\n}" "$1" $num "$2 | # "
}

display_rowloader ()
{
	smnt=1
	sp='|/—\'
	while ps |grep $! &>/dev/null; do
		((smnt++))
		if [ "${sp:$smnt%${#sp}:1}" = "${sp:2:1}" ]; then
			display_row "$setup" "[  ${sp:smnt%${#sp}:1}  ]" '\b' '\r' "[   ]"
		else
			display_row "$setup" "[  ${sp:smnt%${#sp}:1}  ]" '\b' '\r'
		fi
		sleep 0.1
	done
}

display_done ()
{
	display_row "$setup" "[ $green ✔ $endcolor ]" '\b' '\r' "[  ✔  ]"
	printf "\b\n";
}

display_error ()
{
	display_row "$setup" "[ $red ✘ $endcolor ]" '\b' '\r' "[  ✘  ]"
	printf "\b\n";
}

display_screen ()
{
	clear
	display_header "$1"
}

display_screen "We are not responsible for any damages that may possibly occur while using Hexeract!"sleep 2

display_screen "Welcome to Hexeract!"
trap "rm -rf $tmp" INT TERM EXIT

display_row " "
display_row "Preparing Installation: "
display_row " "
setup="Adding Repositories"
(
	sudo -s <<<HEXERACT
	apt-add-repository ppa:moka/stable -y
	apt-add-repository ppa:numix/ppa -y
	apt-add-repository ppa:noobslab/icons -y
	apt-add-repository ppa:nitrux-team/nitrux-artwork -y
	apt-add-repository ppa:moka/stable -y
	apt-add-repository ppa:numix/ppa -y
	apt-add-repository ppa:noobslab/icons -y
	apt-add-repository ppa:snwh/pulp -y
	apt-add-repository ppa:snwh/pulp -y
	apt-add-repository ppa:noobslab/themes -y
	apt-add-repository ppa:numix/ppa -y
	apt-add-repository ppa:noobslab/themes -y
	apt-add-repository ppa:moka/stable -y

	HEXERACT
) &> /dev/null && display_done || display_error &
display_rowloader

setup="Updateing System"
(
	 sudo apt-get update
) &> /dev/null && display_done || display_error &
display_rowloader
display_row " "
display_row " "
display_row "Starting Installation: "
display_row " "


echo ""
echo ""
echo "Installing Icons"
echo ""

echo "Installing Moka"
(
	apt-get -y install moka-icon-theme
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output

echo "Installing Numix-Circle"
(
	apt-get -y install numix-icon-theme-circle
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output

echo "Installing El Faenza"
(
	apt-get -y install faenza-icon-theme
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output

echo "Installing Numix-uTouch"
(
	apt-get install git
	git clone https://github.com/numixproject/numix-icon-theme-utouch.git $tmp/utouch
	mv $tmp/utouch/Numix-uTouch /usr/share/icons/
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output

echo "Installing Nitrux"
(
	apt-get -y install nitrux-icon-theme
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output

echo "Installing Pacifica"
(
	wget http://fc00.deviantart.net/fs71/f/2013/305/9/6/pacifica_icons_by_bokehlicia-d6nn5lb.zip -O $tmp/pacifica.zip
	unzip $tmp/pacifica.zip -d $tmp
	mv $tmp/Pacifica /usr/share/icons/
	mv $tmp/Pacifica-U /usr/share/icons/
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output

echo "Installing Flattr"
(
	wget https://github.com/NitruxSA/flattr-icons/archive/master.zip -O $tmp/flattr.zip && unzip $tmp/flattr.zip -d $tmp && mv $tmp/flattr-icons-master/Flattr /usr/share/icons
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output

echo "Installing Faba"
(
	apt-get -y install faba-icon-theme faba-mono-icons
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output

echo "Installing Numix"
(
	apt-get -y install numix-icon-theme
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output

echo "Installing Ultra Flat"
(
	apt-get -y install ultra-flat-icons
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output

echo "Installing Paper"
(
	apt-get -y install paper-icon-theme
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output



echo ""
echo ""
echo "Installing Themes"
echo ""

echo "Installing Paper"
(
	apt-get -y install paper-gtk-theme
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output

echo "Installing Vertex"
(
	apt-get -y install vertex-theme
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output

echo "Installing Numix"
(
	apt-get -y install numix-gtk-theme
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output

echo "Installing Arc"
(
	wget http://download.opensuse.org/repositories/home:/Horst3180/xUbuntu_15.04/all/arc-theme_1450051815.946cbf5_all.deb -O $tmp/arc-theme.deb
	dpkg -i $tmp/arc-theme.deb
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output

echo "Installing Flatabulous"
(
	apt-get -y install flatabulous-theme
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output

echo "Installing Orchis"
(
	apt-get -y install orchis-gtk-theme
) &> /dev/null && echo -e "$green OK $endcolor" || echo -e "$red FAILED $endcolor"; # Hide all output


display_row " "
display_row " "
display_row "Updateing Packages: "
display_row " "

setup="Installing Failed Dependencies"
(
	sudo apt-get -f install -y
)  &> /dev/null && display_done || display_error &
display_rowloader

setup="Clearing Packages"
(
	sudo apt-get -y autoremove
	sudo apt-get -y autoclean
	sudo apt-get -y clean
)  &> /dev/null && display_done || display_error &
display_rowloader


display_row " " 
 display_row " " 
 display_row "Installation has ended!"
notify-send "Hexeract" "Finished installing"

exit 0