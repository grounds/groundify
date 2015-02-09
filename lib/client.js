function Client(endpoint, gists) {
    this.endpoint = endpoint;
    this.loaded = false;
    this.currentGist = null;
    this.gists = gists;
}

Client.prototype.connect = function() {
    this.socket = io.connect(this.endpoint);
    
    var self = this;

    this.socket.on('connect', function() {
        if (self.loaded) return;

        self.loaded = true;
        
        for (var index = 0; index < self.gists.length; index++) {
            var _ = new Gist(self.gists[index], self);
        }
    }).on('run', function(data) {
        self.currentGist.addOutput(data);
    });
}

Client.prototype.run = function(gist) {
    if (this.currentGist) this.currentGist.flush();

    this.currentGist = gist;
    this.socket.emit('run', {language: gist.language, code: gist.code});
}