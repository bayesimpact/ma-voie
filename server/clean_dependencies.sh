#!/bin/bash

npm run -s build
# typescript transpiles to the lib folder.
readonly REQUIRED_LIBS=$(grep -hor 'require.*' lib/ |
    sed -e 's/require("//' -e 's/"))\?;//' |
    grep -v '^\.' |
    sort | uniq)
readonly DEPENDENCIES=$(jq -r '.dependencies|keys|.[]' package.json)
readonly MISSING_DEPENDENCIES=$(tr ' ' '\n' <<< "$REQUIRED_LIBS $DEPENDENCIES $DEPENDENCIES" |
    sort | uniq -u)
readonly UNUSED_DEPENDENCIES=$(tr ' ' '\n' <<< "$REQUIRED_LIBS $REQUIRED_LIBS $DEPENDENCIES" |
    sort | uniq -u)
if [ -z "$MISSING_DEPENDENCIES" ] && [ -z "$UNUSED_DEPENDENCIES" ]; then
    echo "All dependencies are at their relevant position."
    exit
fi
if [ "$MISSING_DEPENDENCIES" ]; then
    echo 'The following dependencies should be added: '$MISSING_DEPENDENCIES
fi
if [ "$UNUSED_DEPENDENCIES" ]; then
    echo 'The following dependencies should be removed or moved to devDependencies: '$UNUSED_DEPENDENCIES
fi
exit 1

