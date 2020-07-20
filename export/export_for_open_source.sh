#! /bin/bash

# Script to create an export of this repository for open sourcing.
# TODO(cyrille): Make an independant configurable project and use it both here and in Bob.
#
# USAGE:
# 1. Clone the open source repository from https://github.com/bayesimpact/briser-la-chaine locally.
# 2. Run export/export_for_open_source.sh /path/to/briser-la-chaine

set -e

# Silence pushd and popd commands.
pushd () {
    command pushd "$@" > /dev/null
}
popd () {
    command popd "$@" > /dev/null
}

# Colors for output formatting.
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly RESET_COLOR='\033[0m'

readonly DEFAULT_EXPORT_DIR="$(realpath ../briser-la-chaine)"


if [ -z "$1" ]; then
  if [ ! -d "${DEFAULT_EXPORT_DIR}" ]; then
    echo "Give the path to the export repository as a first argument."
    exit 1
  fi
  readonly EXPORT_DIR="${DEFAULT_EXPORT_DIR}"
else
  if [ ! -d "$1" ]; then
    echo "The given path ($1) does not exist or is not a folder."
    exit 2
  fi

  readonly EXPORT_DIR="$(realpath "$1")"
fi

# Ensures that current dir is clean.
if [ -n "$(git diff HEAD --shortstat 2> /dev/null | tail -n1)" ]; then
  echo "Current git status is dirty. Commit, stash or revert your changes before exporting." 1>&2
  if [ -z "$DRY_RUN" ]; then
    exit 3
  fi
fi

# TODO(cyrille): Ensure the export dir is a git repo.
# Ensures the current branch contains 'export' which is necessary to trigger the
# large test suite on CircleCI.
GIT_BRANCH=$(git -C "${EXPORT_DIR}" rev-parse --abbrev-ref HEAD)
if [[ "${GIT_BRANCH}" == "master" ]] ; then
  if [ -z "$DRY_RUN" ]; then
    git -C "${EXPORT_DIR}" checkout -b export
  fi
else
  if [[ ! "${GIT_BRANCH}" =~ "export" ]] ; then
    echo "Please export to a branch that contains the word 'export' in order to execute all tests (found: ${GIT_BRANCH})."
    if [ -z "$DRY_RUN" ]; then
      exit 4
    fi
  fi
fi


# Remove all files, so that files that have disappeared from the main repo are
# deleted in the export.
if [ -z "$DRY_RUN" ]; then
  git -C "${EXPORT_DIR}" rm -r . > /dev/null
fi

# Copy all files from export/whitelist.txt
docker build --build-arg UID="$(id -u)" -t bayesimpact/bob-source-export export
docker run --rm -e DRY_RUN="$DRY_RUN" -u "$(id -u)" -v "$(pwd):/src/:ro" -v "${EXPORT_DIR}:/dst/:rw" bayesimpact/bob-source-export python /src/export/export.py export/whitelist.txt export/blacklist.txt

if [ -n "$DRY_RUN" ]; then
  exit 6
fi

# TODO(cyrille): Add a CHANGELOG.md.
# TODO(cyrille): Add a HISTORY.md.
if [ -f "${EXPORT_DIR}/HISTORY.md" ]; then
  echo "Cleaning up internal links and internal-only information from History"
  sed -i -e "s/ - \\[\\w*\\]([^)]*ma-voie-internal[^)]*)//" "${EXPORT_DIR}/HISTORY.md"
  sed -i -e "s/ - \\[\\w*\\]([^)]*ma-voie-demo.bayes.org[^)]*)//" "${EXPORT_DIR}/HISTORY.md"
fi

echo "Removing lines containing no-open-source"
grep "no-open-source" -lr "${EXPORT_DIR}" | xargs -r sed -i "/no-open-source-start/,/no-open-source-end/d;/no-open-source/d"

# Files that only exist in briser-la-chaine repo should be kept.
git -C "${EXPORT_DIR}" checkout HEAD -- $(grep -v "^#" export/only-in-open-source)


echo
echo -e "${GREEN}Export successful!${RESET_COLOR}"

readonly COMMIT=$(git rev-parse --short HEAD)

# Warn if the current git commit is not in the master branch.
if git merge-base --is-ancestor $COMMIT origin/master; then
    readonly MASTER_WARNING=""
else
    readonly MASTER_WARNING=", not currently in master, DO NOT SUBMIT"
fi


git -C "${EXPORT_DIR}" add .
git -C "${EXPORT_DIR}" commit -m "Automated export ($COMMIT$MASTER_WARNING)"
