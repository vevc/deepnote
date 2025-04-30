#!/usr/bin/env sh

HOST=${HOST:-xxx.deepnoteproject.com}
wget https://github.com/XTLS/Xray-core/releases/download/v25.3.6/Xray-linux-64.zip
unzip Xray-linux-64.zip
wget https://raw.githubusercontent.com/vevc/deepnote/main/config.json
UUID=`$PWD/xray uuid`
sed -i 's/$UUID/'$UUID'/g' $PWD/config.json
wget https://raw.githubusercontent.com/vevc/deepnote/main/startup.sh
chmod +x startup.sh
$PWD/startup.sh
echo '---------------------------------------------------------------'
echo "vless://$UUID@$HOST:443?encryption=none&security=tls&fp=random&type=ws&path=%2F%3Fed%3D2560#deepnote-ws"
echo '---------------------------------------------------------------'
