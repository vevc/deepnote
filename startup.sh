#!/usr/bin/env sh

nohup $PWD/xray -c $PWD/config.json 1>/dev/null 2>&1 &
