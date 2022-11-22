#!/bin/bash

cd plugins
for FILE in *; do
    if [ -d "$FILE" ]; then
        cd "$FILE"
        echo "plugin $FILE: resolving dependencies"
        npm i > /dev/null
        cd ..
    fi
done
