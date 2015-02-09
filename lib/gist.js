var controls = [
    '<div style="border-top: 1px solid #ddd; padding: 5px;">',
        '<button>Run</button>',
        '<button>Reset</button>',
        '<div class="line-data highlight"></div>',
    '</div>',
    '<div class="gist-meta">run with &#10084; by ',
        '<a href="http://beta.42grounds.io">Grounds</a>',
    '</div>'
].join('');

function Gist(element, client) {
    this.element = element;
    this.client = client;
    this.element.innerHTML += controls;

    this.console = this.element.getElementsByClassName('line-data')[1];
    // Refactoring needed: create button prototype
    this.buttons = {
        run: {
            element: this.element.getElementsByTagName('button')[0],
            gist: this,
            onClick: function(handler) {
                this.element.gist = this.gist;
                this.element.addEventListener('click', handler);
            }
        },
        reset: {
            element: this.element.getElementsByTagName('button')[1],
            gist: this,
            onClick: function(handler) {
                this.element.gist = this.gist;
                this.element.addEventListener('click', handler);
            }
        }
    }
    this.buttons.run.onClick(function() {
       this.gist.run();
    });
    this.buttons.reset.onClick(function() {
       this.gist.flush();
    });
}

Gist.prototype.run = function() {
    var code = this.getCode();

    this.flush();
    this.client.currentGist = this;
    this.client.emit('run', { language: 'ruby', code: code });
}

Gist.prototype.flush = function() {
    this.console.innerHTML = '';
}

Gist.prototype.getCode = function() {
    var lines = this.element.getElementsByClassName('line-data')[0]
                            .getElementsByClassName('line'),
        code  = '';

    for (var index = 0; index < lines.length; index++) {
        code += lines[index].textContent;
    }
    return code;
}

Gist.prototype.addOutput = function(data) {
    var cssClass = '';
    switch (data.stream) {
        case 'status':
            data.chunk = '[Program exited with status: '+data.chunk+']';
            cssClass = 'pl-ent';
            break;
        case 'error':
            cssClass = 'pl-s1';
            break;
    }
    this.console.innerHTML += [
        '<pre class="line-pre">',
            '<div class="line '+cssClass+'">'+data.chunk+'</div>',
        '</pre>'
    ].join('');
}