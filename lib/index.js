var gists = document.getElementsByClassName('gist-file');

// If there is no gists on the page, there is no point
// to do anything.
if (gists.length <= 0) return;

var client = new Client('ws://beta.42grounds.io', gists);

client.load(gists);
client.connect();