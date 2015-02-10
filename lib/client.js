function Client(endpoint) {
    this.endpoint = endpoint;
    this.gists = [];
    this.currentGist = null;
    this.firstConnection = true;
}

Client.prototype.connect = function() {
    if (!this.shouldConnect()) return;
    
    this.socket = io.connect(this.endpoint);
    
    var self = this;

    this.socket.on('connect', function() {
        if (!self.firstConnection) return;

        self.firstConnection = false;
        self.gists.forEach(function(gist){
           gist.addControls(); 
        });
        
    }).on('run', function(data) {
        self.currentGist.addOutput(data);
    });
}

Client.prototype.run = function(gist) {
    if (this.currentGist) this.currentGist.flush();

    this.currentGist = gist;
    this.socket.emit('run', {language: gist.language, code: gist.code});
}

// Shouldn't connect if there is no runnable gist
// check languages compatibility first
Client.prototype.shouldConnect = function() {
    return this.gists.length > 0;
}

Client.prototype.load = function(gistsElement) {
    for (var index = 0; index < this.gistElements.length; index++) {
        var gist = new Gist(this.gistElements[index], this);

        if (gist) this.gists.push(gist);
    }
}