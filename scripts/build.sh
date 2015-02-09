#!/bin/sh
set -e

lib() {
    jspp application.js > build/grounds-gist.js
}

minify() {
    uglifyjs build/grounds-gist.js -o build/grounds-gist.min.js
}

main() {
	# If first parameter from CLI is missing or empty
	if [ -z $1 ]; then
		echo "usage: build [lib|minify]"
		return
	fi
	eval $1
}

main "$@"