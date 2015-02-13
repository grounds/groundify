var constants = require('./constants'),
    Client = require('./client');

var gists = document.getElementsByClassName('gist-file');

// If there is no gists on the page, there is no point
// to do anything.
if (gists.length <= 0) return;

var client = new Client(constants.runnerURL);

client.load(gists);
client.connect();
