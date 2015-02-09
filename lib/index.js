var gists = document.getElementsByClassName('gist-file');

// If there is no gists on the page, there is no point
// to establish a connection with grounds code runner.
if (gists.length <= 0) return;

var client = new Client('ws://beta.42grounds.io', gists);

client.connect();