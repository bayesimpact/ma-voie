#!/bin/bash
readonly DURATION="${1:-7 days}"
readonly FOLDER="$2"

readonly PAST="$(date -I -d "-$DURATION")"
readonly PAST_COMMIT="$(git log --before "$PAST" --format=%h -1 $FOLDER)"

readonly RECENT_TODOS_FILE="$(mktemp)"
grep \\bTODO\\b -r $FOLDER > "$RECENT_TODOS_FILE"

readonly PAST_TODOS_FILE="$(mktemp)"
git checkout -q "$PAST_COMMIT"
grep \\bTODO\\b -r $FOLDER > "$PAST_TODOS_FILE"
git checkout -q -

readonly NUM_REMOVED="$(cat "$PAST_TODOS_FILE" "$RECENT_TODOS_FILE" "$RECENT_TODOS_FILE" | sort | uniq -u | wc -l)"

readonly TODOS_ADDED="$(mktemp)"
cat "$PAST_TODOS_FILE" "$PAST_TODOS_FILE" "$RECENT_TODOS_FILE" | sort | uniq -u \
    | sed -e "s/TODO\((.*)\)\?: \?\(.*\)$/TODO\1: *\2*/" \
    > "$TODOS_ADDED"
readonly NUM_ADDED="$(cat "$TODOS_ADDED" | wc -l)"

if [ "$NUM_REMOVED" == "0" ] && [ "$NUM_ADDED" == "0" ]; then
    echo "No changes in TODOs."
else
    echo "$NUM_REMOVED TODOs removed."
    echo "$NUM_ADDED TODOs added:"
    cat "$TODOS_ADDED"

    if [ -n "$SLACK_INTEGRATION_URL" ]; then
        readonly SLACK_MESSAGE="$(mktemp)"
        readonly URL_TO_FILE="https://github.com/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/blob/${CIRCLE_SHA1:-master}/"
        sed -i -e "s/^\([^:]*\):/<${URL_TO_FILE//\//\\/}\1|\1>:/" "$TODOS_ADDED"
        python3 -c "import json
todos_added = open('$TODOS_ADDED', 'r').read()
slack_message = {'text': 'TODOs modifications since $PAST.\n$NUM_REMOVED TODOs removed\n$NUM_ADDED TODOs added:\n' + todos_added}
with open('$SLACK_MESSAGE', 'w') as slack_message_file:
  json.dump(slack_message, slack_message_file)"
        wget -o /dev/null -O /dev/null --post-file=$SLACK_MESSAGE "$SLACK_INTEGRATION_URL"
        rm -f "$SLACK_MESSAGE"
    fi
fi

rm -f "$PAST_TODOS_FILE" "$RECENT_TODOS_FILE" "$TODOS_ADDED"
