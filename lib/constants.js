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
        '<button style="'+buttonStyle+'">Run</button>',
        '<button style="'+buttonStyle+'">Reset</button>',
        '<div class="line-data highlight" style="padding: 5px 5px 0 5px !important"></div>',
    '</div>',
    '<div class="gist-meta">run with &#10084; by ',
        '<a href="http://beta.42grounds.io">Grounds</a>',
    '</div>'
].join('');

// Language runner associated to file extension
// e.g. Ruby official file extension is .rb
var extensions = {
    go: 'go',
    java: 'java',
    php: 'php',
    node: 'js',
    ruby: 'rb',
};