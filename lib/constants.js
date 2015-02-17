var css = require('./css');

module.exports.controls = [
    '<div style="border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 5px 5px 0px 5px">',
        '<button class="run" style="'+css.style.button+'">Run</button>',
        '<button class="flush" style="'+css.style.button+'">Flush</button>',
        '<div class="line-data highlight" style="padding: 0px !important">',
            '<pre class="line-pre console" style="padding-bottom: 5px !important;"></pre>',
        '</div>',
    '</div>',
    '<div class="'+css.klass.meta+'">run with &#10084; by ',
        '<a href="http://beta.42grounds.io">Grounds</a>',
    '</div>'
].join('');

module.exports.topBuffer = '<div style="margin-top: 5px !important;"></div>';

// Language runner associated to file extension
// e.g. Ruby official file extension is .rb
module.exports.extensions = {
    c: 'c',
    cpp: 'cpp',
    csharp: 'cs',
    elixir: 'exs',
    golang: 'go',
    haxe: 'hx',
    java: 'java',
    node: 'js',
    php: 'php',
    python3: 'py',
    ruby: 'rb',
    rust: 'rs'
};

module.exports.runnerURL = 'wss://beta.42grounds.io';
