#!/bin/bash

# TODO(émilie): Correct when https://github.com/prescottprue/react-redux-firebase/issues/997 is corrected.
sed -i -e "s/StorageTypes\.UploadTaskSnapshot\.metadata/StorageTypes\.UploadTaskSnapshot['metadata']/" node_modules/react-redux-firebase/index.d.ts
