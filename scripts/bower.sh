#!/bin/bash
if [ -z "$1" ] ; then
    echo 'First param should be the first bower param'
    exit 1
fi
if [ -z "$2" ] ; then
    echo 'Second param should be the containers ID'
    exit 1
fi
docker exec $2 ./node_modules/bower/bin/bower $1 --allow-root