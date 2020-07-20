#!/bin/bash
# Decide what name to use to tag Docker image and demo server from the CircleCI pipeline.
if [ -n "$CIRCLE_BRANCH" ]; then
  TAG="branch-$CIRCLE_BRANCH"
elif [ -n "$CIRCLE_TAG" ]; then
  TAG="tag-$CIRCLE_TAG" ;
fi
echo $TAG
