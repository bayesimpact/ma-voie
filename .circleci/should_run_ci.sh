#!/bin/bash
readonly BRANCH=$1
readonly TAG=$2

set -x

if [ "$BRANCH" == "master" ] || [ -n "$TAG" ]; then
  # Run all tests on master and frontend tags.
  exit
fi

readonly SKIP_ALL="skip-server skip-client"
# Do not run CI if the branch doesn't exist anymore.
if [ -z "$(git ls-remote --heads origin "$BRANCH")" ]; then
  touch ${SKIP_ALL}
  exit
fi

# Do not run CI if the branch has already been updated.
if [ "$(git ls-remote --heads origin "$BRANCH" | cut -f1)" != "$(git rev-parse HEAD)" ]; then
  touch ${SKIP_ALL}
  exit
fi

# Find the most recent commit that was in master (considered as green).
readonly LAST_GREEN="$(git merge-base HEAD origin/master)"
readonly DIFF_FILES=$(mktemp)
git diff --name-only "${LAST_GREEN}" "${BRANCH}"> "${DIFF_FILES}"

# Ignore changes on some files.
sed -i -e "/^README.md$/d" "${DIFF_FILES}"

if [ -z "$(grep -v ^server/ "${DIFF_FILES}")" ]; then
  # Changes are only in server.
  touch skip-client
fi

if [ -z "$(grep ^server/ "${DIFF_FILES}")" ]; then
  # No changes are in server.
  touch skip-server
fi
