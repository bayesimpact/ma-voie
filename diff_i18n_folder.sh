#!/bin/bash
#
# Check wether i18n extraction has added or dropped any key.
set -e

readonly TMP_FOLDER="$(mktemp -d)"
cp -r src/translations/. "$TMP_FOLDER"

npm run --silent i18n

if ! diff -ar src/translations "$TMP_FOLDER"; then
  echo 'Translations files are not stable after extraction.'
  rm -rf "$TMP_FOLDER"
  exit 1
fi
echo "Translations files are stable after extraction."

rm -rf "$TMP_FOLDER"
