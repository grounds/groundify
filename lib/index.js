var constants = require('./constants'),
    css = require('./css'),
    Client = require('./client');

var gists = document.getElementsByClassName(css.klass.gists);

// If there is no gists on the page, there is no point
// to do anything.
if (gists.length <= 0) return;

var client = new Client(constants.runnerURL);

client.load(gists);
client.connect();
