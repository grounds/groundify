#!/bin/sh
set -e

# Binaries used to build, test and package this project.
browserify="./node_modules/browserify/bin/cmd.js"
watchify="./node_modules/watchify/bin/cmd.js"
uglify="./node_modules/uglify-js/bin/uglify"
mocha_phantomjs="./node_modules/mocha-phantomjs/bin/mocha-phantomjs"

origin="index.js"
project="groundify"
build_target="build/$project.js"
$build_min_target="build/$project.min.js"


clean() {
    rm -rf build/*
}

dependencies() {
    npm install
}

dev() {
    $watchify $origin -o $build_target
}

build() {
    $browserify $origin -o $build_target
}

minify() {
    $uglifyjs $build_target -o $build_min_target
}

test_acceptance() {
    $mocha_phantomjs test/SpecRunner.html
}

test_unit() {
    npm test
}

test() {
    echo "-- Acceptance Tests --"
    test_acceptance
    echo "----------------------"

    echo "----- Unit Tests -----"
    test_unit
    echo "----------------------"
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
