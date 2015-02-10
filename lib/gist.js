function Gist(element, client) {
    this.element = element;
    this.client = client;
    this.filename = this.element.getElementsByTagName('a')[1].textContent;
    this.language = this.getLanguage();
    this.code = this.getCode();
}

Gist.prototype.isValid = function() {
    return this.language !== 'invalid';
}

Gist.prototype.run = function() {
    this.client.run(this);
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

Gist.prototype.getLanguage = function() {
    for(var language in extensions) {
        var regex = new RegExp('^.*\.('+extensions[language]+')$');

        if (this.filename.match(regex)) return language;
    }
    return 'invalid';
}

Gist.prototype.addControls = function() {
    // Add controls
    this.element.innerHTML += controls;
    this.console = this.element.getElementsByClassName('line-data')[1];
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

Gist.prototype.addOutput = function(data) {
    var cssClass = '';

    switch (data.stream) {
        case 'status':
            data.chunk = '[Program exited with status: '+data.chunk+']';
            cssClass = 'pl-ent';
            break;
        case 'stderr':
            cssClass = 'pl-s1';
            break;
    }
    this.console.innerHTML += '<span class="line '+cssClass+'">'+data.chunk+'</span>';
}
