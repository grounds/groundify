function Gist(type) {
    this.type = type;
}

Gist.prototype.getGroundsLink = function() {
    return this.getElement()
               .getElementsByClassName('gist-meta')[1]
               .getElementsByTagName('a')[0];
}

Gist.prototype.getChildren = function(name) {
    return this.getElement().getElementsByClassName(name)[0];
}

Gist.prototype.getElement = function(name) {
    return getGists()[this.type];
}

Gist.prototype.getControls = function() {
    return this.getChildren('controls');
}

Gist.prototype.isReady = function(callback) {
    var self = this;

    waitFor(function() {
        return self.getControls();
    }, callback);
}

Gist.prototype.click = function(element) {
    this.getChildren(element).click();
}

Gist.prototype.run = function(callback) {
    this.click('run');

    var self = this;

    waitFor(function() {
        return self.getChildren('status');
    }, callback);
}

Gist.prototype.flush = function(callback) {
    this.click('flush');

    var self = this;

    waitFor(function() {
        return self.hasOutput('');
    }, callback);
}

Gist.prototype.hasOutput = function(output) {
    return this.getChildren('console').textContent === output;
}

function getGists() {
    return document.getElementsByClassName('gist-file');
}

function waitFor(findElement, callback) {
    var element = findElement();

    if (!!element) return callback(element);
    setTimeout(function() {
        waitFor(findElement, callback);
    }, 10);
}
