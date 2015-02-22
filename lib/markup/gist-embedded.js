var html = require('./html');
// Styles adapted for gist website:
// https://gist.github.com/
//
// Necessary to build browser extensions.

module.exports.style = {
    button: [
        'padding: 5px;',
        'margin-right: 5px;',
        'border-radius: 2px;',
        'border: 1px solid #ddd;',
        'background-color: #f7f7f7;',
        'font-weight: bold;',
        'font: 12px Helvetica, arial, freesans, clean, sans-serif;',
        'color: #666;'
    ].join('')
}

module.exports.klass = {
    gists: 'gist-file',
    meta: 'gist-meta'
}

module.exports.html = html.load(this);