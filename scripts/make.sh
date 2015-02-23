#!/bin/sh
set -e

# Binaries used to build, test and package this project.
bin="./node_modules/.bin"

if [ -z "$BROWSERIFYSWAP_ENV" ]; then
    build_type=""
else
    build_type="-$BROWSERIFYSWAP_ENV"
fi

build_dir="build"
build_name="groundify$build_type"
build_target="$build_dir/$build_name.js"
build_min_target="$build_dir/$build_name.min.js"

clean() {
    rm -rf build/*
}

dependencies() {
    npm install
}

dev() {
    $bin/watchify . -o $build_target
}

build() {
    $bin/browserify . -o $build_target
}

minify() {
    $bin/uglifyjs $build_target -o $build_min_target
}

test_acceptance() {
    echo "-- Acceptance Tests --"
    $bin/mocha-phantomjs test/SpecRunner.html
    echo "----------------------"
}

test_unit() {
    echo "----- Unit Tests -----"
    $bin/mocha --recursive test/lib
    echo "----------------------"
}

main() {
    # If first parameter from CLI is missing or empty
    if [ -z $1 ]; then
        echo "usage: please specify a command."
        return
    fi
    eval $1
}

main "$@"
