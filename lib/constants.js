var buttonStyle = [
    'padding: 5px;',
    'margin-right: 5px;',
    'border-radius: 2px;',
    'border: 1px solid #ddd;',
    'background-color: #f7f7f7;',
    'font-weight: bold;',
    'font: 12px Helvetica, arial, freesans, clean, sans-serif;',
    'color: #666;'
].join('');

var controls = [
    '<div style="border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 5px 5px 0px 5px">',
        '<button class="run" style="'+buttonStyle+'">Run</button>',
        '<button class="flush" style="'+buttonStyle+'">Flush</button>',
        '<div class="line-data highlight" style="padding: 0px !important">',
            '<pre class="line-pre console" style="padding-bottom: 5px !important;"></pre>',
        '</div>',
    '</div>',
    '<div class="gist-meta">run with &#10084; by ',
        '<a href="http://beta.42grounds.io">Grounds</a>',
    '</div>'
].join('');

var topBuffer = '<div style="margin-top: 5px !important;"></div>';

// Language runner associated to file extension
// e.g. Ruby official file extension is .rb
var extensions = {
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

var runnerURL = 'ws://beta.42grounds.io';
