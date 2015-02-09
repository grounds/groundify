var gists = document.getElementsByClassName('gist-file');

// If there is no gists on the page, there is no point
// to establish a connection with grounds code runner.
if (gists.length <= 0) return;

var client = io.connect('ws://beta.42grounds.io'),
    load = true;

client.on('connect', function() {
    // Only add grounds control to gists on first
    // successful connection.
    if (!load) return;

    load = false;

    for (var i = 0; i < gists.length; i++) {
        var _ = new Gist(gists[i], client);
    }
}).on('connect_error', function(err) {
    console.error(err);
}).on('run', function(data) {
    this.currentGist.addOutput(data);
});
