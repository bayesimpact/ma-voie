#!/bin/bash

readonly JS_APP_FILES="/usr/share/app/html/assets/*.js"

function replace_string() {
  from=$1; to=$2; shift; shift
  from_pattern="$(sed -e 's/[]\/$*.^|[]/\\&/g' <<< "$from")"
  to_replacement="$(sed -e 's/[\/&]/\\&/g' <<< "$to")"
  # TODO(cyrille): Fail if from_pattern is not found.
  sed -i -e "s/${from_pattern}/${to_replacement}/g" $@
}

# TODO(cyrille): Try to find a better way to do that.
replace_string 'environment:"production"' 'environment:"demo"' "$JS_APP_FILES"

# TODO(pascal): Read from const.json5 and const_dist.json5
replace_string '6d5d1f5cb15e3cc946cbe3783e5f9e7f' '174aeb9469460975d8d6a14b31b6f916' "$JS_APP_FILES"
replace_string '{"apiKey":"AIzaSyAGH7JHYblSrKJsBSdr5UG0ZEBNdj8QRBM","appId":"1:740445000971:web:f73319eae6caf130c5be0e","authDomain":"ma-voie.firebaseapp.com","databaseURL":"https://ma-voie.firebaseio.com","messagingSenderId":"740445000971","projectId":"ma-voie","storageBucket":"ma-voie.appspot.com"}' \
    '{"apiKey":"AIzaSyCPdmI7WHWy6McHgu53OdW_QToZCAxMuT8","authDomain":"ma-voie-demo.firebaseapp.com","databaseURL":"https://ma-voie-demo.firebaseio.com","projectId":"ma-voie-demo","storageBucket":"ma-voie-demo.appspot.com","messagingSenderId":"1010721781393","appId":"1:1010721781393:web:a125d44474595b3ad67130"}' \
    "$JS_APP_FILES"

# TODO(pascal): Try to find a way to run the command if any.
nginx -g 'daemon off;'
