#!/bin/sh
set -e

# Binaries used to build, test and package this project.
bin="./node_modules/.bin"

if [ -z "$BUILD_TYPE" ]; then
    BUILD_TYPE="embedded"
    build_suffix=""
else
    build_suffix="-$BUILD_TYPE"
fi

build_dir="build"
name="groundify$build_suffix"
target="$build_dir/$name.js"
min_target="$build_dir/$name.min.js"

clean() {
    rm -rf build/*
}

dependencies() {
    npm install
}

build() {
    BROWSERIFYSWAP_ENV=$BUILD_TYPE $bin/browserify . -o $target
}

minify() {
    $bin/uglifyjs $target -o $min_target
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
