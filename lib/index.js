var constants = require('./constants'),
    css = require('./css'),
    Client = require('./client');

var client = new Client(constants.runnerURL),
    gists = document.getElementsByClassName(css.klass.gists);

client.load(gists);
client.connect();