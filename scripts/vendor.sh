#!/bin/sh
set -e

SOCKET_IO="1.3.3"

wget -O vendor/socket.io.js "https://cdn.socket.io/socket.io-$SOCKET_IO.js"