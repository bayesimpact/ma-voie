#!/bin/bash

export PATH="$PATH:/usr/app/node_modules/.bin"

if [ -z "$FIREBASE_TOKEN" ]; then
    firebase login --no-localhost
fi

if npm run | grep "^  $1\$"; then
    npm run $@
else
    $@
fi
