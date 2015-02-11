# groundify
[![Build Status](https://travis-ci.org/grounds/groundify.svg)](https://travis-ci.org/grounds/groundify)

Groundify is a javascript plugin to make [gists](https://gist.github.com/)
runnable.

Groundify is using [Grounds](http://beta.42grounds.io) code
[runner](https://github.com/grounds/grounds-exec).

Groundify enforces first that a gist is supported by the code runner.
If this gist's language is supported, groundify add a control bar to run
this gist.

![Groundify](/images/example.png)

## Installation
1. Drop an embedded gist in your page:
    ```html
    <script src="https://gist.github.com/folieadrien/793e21dee21e0c7b81a8.js"></script>
    ```

2. Drop groundify plugin in your page:
    ```html
    <script src="https://rawgit.com/grounds/groundify/master/build/groundify.min.js"></script>
    ```

**This project is still at an early development stage and therefore is unstable.**
