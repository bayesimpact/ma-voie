#!/bin/bash

readonly JS_APP_FILES="/usr/share/app/html/assets/*.js"

function replace_string() {
  from=$1; to=$2; shift; shift
  from_pattern="$(sed -e 's/[]\/$*.^|[]/\\&/g' <<< "$from")"
  to_replacement="$(sed -e 's/[\/&]/\\&/g' <<< "$to")"
  sed -i -e "s/${from_pattern}/${to_replacement}/g" $@
}

# TODO(cyrille): Try to find a better way to do that.
replace_string 'environment:"production"' 'environment:"demo"' "$JS_APP_FILES"

# TODO(pascal): Read from const.json5 and const_dist.json5
replace_string '6d5d1f5cb15e3cc946cbe3783e5f9e7f' '174aeb9469460975d8d6a14b31b6f916' "$JS_APP_FILES"
replace_string 'AIzaSyAGH7JHYblSrKJsBSdr5UG0ZEBNdj8QRBM' 'AIzaSyCPdmI7WHWy6McHgu53OdW_QToZCAxMuT8' "$JS_APP_FILES"
replace_string 'ma-voie.firebaseapp.com' 'ma-voie-demo.firebaseapp.com' "$JS_APP_FILES"
replace_string 'https://ma-voie.firebaseio.com' 'https://ma-voie-demo.firebaseio.com' "$JS_APP_FILES"
replace_string 'ma-voie.appspot.com' 'ma-voie-demo.appspot.com' "$JS_APP_FILES"
replace_string '"projectId":"ma-voie"' '"projectId":"ma-voie-demo"' "$JS_APP_FILES"
replace_string '1:740445000971:web:f73319eae6caf130c5be0e' '1:1010721781393:web:a125d44474595b3ad67130' "$JS_APP_FILES"
replace_string '740445000971' '1010721781393' "$JS_APP_FILES"

# TODO(pascal): Try to find a way to run the command if any.
nginx -g 'daemon off;'
