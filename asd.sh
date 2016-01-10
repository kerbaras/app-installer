#!/bin/bash
clear

# Create a secure tmp directory
tmp=$(mktemp -d -t hexeract.XXXXXXXXXX)

sudo -s <<HEXERACT

wget https://github.com/NitruxSA/flattr-icons/archive/master.zip -O $tmp/flattr.zip && unzip $tmp/flattr.zip -d $tmp && mv $tmp/flattr-icons-master/Flattr /usr/share/icons
HEXERACT

exit 0
