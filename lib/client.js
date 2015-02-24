var io = require('socket.io-client'),
    markup = require('./markup'),
    Gist = require('./gist');

function Client(endpoint) {
    this.endpoint = endpoint;
    this.gists = [];
    this.currentGist = null;
    this.firstConnection = true;
    this.socket = null;
}

Client.prototype.connect = function() {
    if (!this.shouldConnect()) return;

    this.socket = io.connect(this.endpoint, {'forceNew': true});

    var self = this;

    this.socket.on('connect', function() {
        if (!self.firstConnection) return;

        self.firstConnection = false;
        self.gists.forEach(function(gist){
           gist.addControls();
        });
    }).on('connect_error', function() {
        if (self.firstConnection) return;

        self.firstConnection = true;
        self.gists.forEach(function(gist){
           gist.removeControls();
        });
    }).on('run', function(data) {
        self.currentGist.addOutput(data);
    });
}

Client.prototype.disconnect = function() {
    if (!this.isConnected()) return;

    this.socket.io.disconnect()
}

Client.prototype.isConnected = function() {
    return !!this.socket && this.socket.connected;
};

Client.prototype.run = function(gist) {
    if (this.currentGist) this.currentGist.flush();

    this.currentGist = gist;
    this.socket.emit('run', {language: gist.language, code: gist.code});
}

// Shouldn't connect if there is no runnable gist.
Client.prototype.shouldConnect = function() {
    return !this.isConnected() && this.gists.length > 0;
}

Client.prototype.start = function() {
    var gistElements = document.getElementsByClassName(markup.klass.gists);

    for (var index = 0; index < gistElements.length; index++) {
        var gist = new Gist(gistElements[index], this);

        if (gist.isRunnable()) this.gists.push(gist);
    }
    this.connect();
}

module.exports = Client;
