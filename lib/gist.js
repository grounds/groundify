function Gist(element, client) {
    this.element = element;
    this.client = client;

    this.setFilename();
    this.setLanguage();
    this.setCode();
}

Gist.prototype.isValid = function() {
    return this.language !== '';
}

Gist.prototype.run = function() {
    this.client.run(this);
}

Gist.prototype.flush = function() {
    this.console.innerHTML = '';
}

Gist.prototype.setFilename = function() {
    this.filename = this.element.getElementsByTagName('a')[1].textContent;
}

Gist.prototype.setLanguage = function() {
    this.language = '';

    for(var language in extensions) {
        var regex = new RegExp('^.*\.('+extensions[language]+')$');

        if (this.filename.match(regex)) {
            this.language = language;
        }
    }
}

Gist.prototype.setCode = function() {
    var lines = this.getChildren('line-data')
                    .getElementsByClassName('line');

    this.code  = '';

    for (var index = 0; index < lines.length; index++) {
        this.code += lines[index].textContent;
    }
}


Gist.prototype.getChildren = function(name) {
    return this.element.getElementsByClassName(name)[0];
}


Gist.prototype.addControls = function() {
    // Add controls
    this.element.innerHTML += controls;
    this.console = this.getChildren('console');

    var self = this;

    this.getChildren('run').addEventListener('click', function() {
        self.run();
    });
    this.getChildren('flush').addEventListener('click', function() {
       self.flush();
    });
}

Gist.prototype.addOutput = function(data) {
    var klass = '';

    switch (data.stream) {
        case 'start':
            this.console.innerHTML += topBuffer;
            return;
        case 'status':
            data.chunk = '[Program exited with status: '+data.chunk+']';
            klass = 'pl-ent';
            break;
        case 'stderr':
            klass = 'pl-s1';
            break;
    }
    this.console.innerHTML += '<span class="line '+klass+'">'+data.chunk+'</span>';
}
