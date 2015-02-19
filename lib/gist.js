var constants = require('./constants'),
    markup = require('./markup');

function Gist(element, client) {
    this.element = element;
    this.client = client;

    this.setFilename();
    this.setLanguage();
    this.setCode();
}

Gist.prototype.isRunnable= function() {
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

    for(var language in constants.extensions) {
        var regex = new RegExp('^.*\.('+constants.extensions[language]+')$');

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
    this.element.innerHTML += markup.html.controls;
    this.console = this.getChildren('console');

    var self = this;

    ['run', 'flush'].forEach(function(action) {
        var button = self.getChildren(action);

        button.addEventListener('click', function() {
            self[action]();
        });
    });
}

Gist.prototype.addOutput = function(output) {
    this.console.innerHTML += markup.html.output(output);
}

module.exports = Gist;
