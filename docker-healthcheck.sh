#!/bin/bash
# /projeto/docker-healthcheck.sh

# Verifica se o Nginx está respondendo
response=$(curl -s -I http://localhost:80)
status=$?

if [ $status -eq 0 ]; then
    # Verifica se o código de status é 200
    if echo "$response" | grep -q "HTTP/1.1 200"; then
        exit 0
    else
        exit 1
    fi
else
    exit 1
fi