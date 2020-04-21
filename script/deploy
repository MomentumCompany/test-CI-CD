#!/bin/sh
ssh richu@142.93.215.76 <<EOF
 cd ~/lostAndFound_Backend
 sudo git pull
 sudo npm install
 sudo npm run build
 pm2 restart all
 exit
EOF
