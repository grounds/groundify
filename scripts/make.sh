#!/bin/sh
set -e

# Binaries used to build, test and package this project.
bin="./node_modules/.bin"

project="groundify"

origin="index.js"
build_target="build/$project.js"
build_min_target="build/$project.min.js"

clean() {
    rm -rf build/*
}

dependencies() {
    npm install
}

dev() {
    $bin/watchify $origin -o $build_target
}

build() {
    $bin/browserify $origin -o $build_target
}

minify() {
    $bin/uglifyjs $build_target -o $build_min_target
}

test_acceptance() {
    $bin/mocha_phantomjs test/SpecRunner.html
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
