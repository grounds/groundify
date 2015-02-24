// This fs call is replaced by brfs to load html file.
// This call must be isolated.
//
// See https://github.com/substack/brfs/issues/25.
var fs = require('fs');

module.exports.prefix = 'grounds-';

module.exports.klass = require('./css').klass;

module.exports.controls = fs.readFileSync(__dirname + '/../../assets/controls.html', 'utf8');

module.exports.output = function(output) {
    var klass = '';

    switch (output.stream) {
        case 'start':
            return '<div class="top-buffer"></div>';
        case 'status':
            output.chunk = '[Program exited with status: '+output.chunk+']';
            klass = 'pl-ent';
            break;
        case 'stderr':
            klass = 'pl-s1';
            break;
    }
    klass += ' grounds-' + output.stream;
    return '<span class="line '+klass+'">'+output.chunk+'</span>';
}
