var css = require('./css');

module.exports.prefix = 'grounds-';

module.exports.klass = css.klass;

module.exports.controls = [
    '<div class="'+this.prefix+'controls" style="border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 5px 5px 0px 5px">',
        '<button class="'+this.prefix+'run" style="'+css.style.button+'">Run</button>',
        '<button class="'+this.prefix+'flush" style="'+css.style.button+'">Flush</button>',
        '<div class="line-data highlight" style="padding: 0px !important">',
            '<pre class="line-pre '+this.prefix+'console" style="padding-bottom: 5px !important;"></pre>',
        '</div>',
    '</div>',
    '<div class="'+this.klass.meta+'">run with &#10084; by ',
        '<a href="http://beta.42grounds.io">Grounds</a>',
    '</div>'
].join('');

module.exports.output = function(output) {
    var klass = '';

    switch (output.stream) {
        case 'start':
            return '<div style="margin-top: 5px !important;"></div>';
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
