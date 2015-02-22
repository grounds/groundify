var prefix = 'grounds-';

// HTML is not dependent of build target
function getControls(markup) {
    return [
        '<div class="'+prefix+'controls" style="border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 5px 5px 0px 5px">',
            '<button class="'+prefix+'run" style="'+markup.style.button+'">Run</button>',
            '<button class="'+prefix+'flush" style="'+markup.style.button+'">Flush</button>',
            '<div class="line-data highlight" style="padding: 0px !important">',
                '<pre class="line-pre '+prefix+'console" style="padding-bottom: 5px !important;"></pre>',
            '</div>',
        '</div>',
        '<div class="'+markup.klass.meta+'">run with &#10084; by ',
            '<a href="http://beta.42grounds.io">Grounds</a>',
        '</div>'
    ].join('');
}

function getOutput(markup) {
    return function(output) {
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
    };
}

module.exports.load = function(markup) {
    return {
        controls: getControls(markup),
        output: getOutput(markup),
        prefix: prefix
    };
}
