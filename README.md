# Groundify
[![Build Status](https://travis-ci.org/grounds/groundify.svg)](https://travis-ci.org/grounds/groundify)

Groundify is a javascript plugin to make [gists](https://gist.github.com/)
runnable.

Groundify is using [Grounds](http://beta.42grounds.io) code
[runner](https://github.com/grounds/grounds-exec).

Groundify enforces first that a gist is supported by the code runner.
If this gist's language is supported, groundify adds a control bar to run
this gist.

**This project is still at an early development stage and therefore is unstable.**

## Example:

![Groundify](/images/example.png)

There is also a demo page available [here](/examples/index.html).

## Embedding Groundify

1. Drop an embedded [gist](https://gist.github.com/) in your page:
    ```html
    <script src="https://gist.github.com/folieadrien/793e21dee21e0c7b81a8.js"></script>
    ```

2. Drop groundify plugin in your page:
    ```html
    <script src="https://rawgit.com/grounds/groundify/master/build/groundify.min.js"></script>
    ```

## Hack on Groundify

All you need is [Node.js](http://nodejs.org/), [npm](https://www.npmjs.com/) and [make](http://www.gnu.org/software/make/) installed to hack on Groundify.

### Prerequisite

1. Clone this project:

        git clone https://github.com/grounds/groundify.git

2. Get into this project directory

        cd groundify

3. Install dependencies:

        make dependencies

### Build

    make all

This will build unminified and minified package in `build` directory.

### Tests

    make test

If you want to only run unit tests:

    make test-unit

If you want to only run acceptance tests:

    make test-acceptance

## Author

**Adrien Folie**

* http://twitter.com/folieadrien
* http://github.com/folieadrien

## Licensing

Groundify is licensed under the MIT License. See [LICENSE](LICENSE) for full
license text.
