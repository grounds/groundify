#!/bin/sh
set -e

origin="index.js"
name="groundify"
build_target="build/$name.js"
min_target="build/$name.min.js"

clean() {
    rm -rf build/*
}

dependencies() {
    npm install -g watchify \
                   browserify \
                   uglify-js \
                   mocha-phantomjs
    npm install
}

dev() {
    watchify $origin -o $build_target
}

build() {
    browserify $origin -o $build_target
}

minify() {
    uglifyjs $build_target -o $min_target
}

test() {
    mocha-phantomjs test/gist.html
}

main() {
    # If first parameter from CLI is missing or empty
    if [ -z $1 ]; then
        echo "usage: build [dependencies|dev|build|minify|test]"
        return
    fi
    eval $1
}

main "$@"
