(function() {
    var io = require('Automattic/socket.io-client');

    var files = document.getElementsByClassName('gist-file'),
        appended = false;

    if (!files) return;

    var socket = io.connect('ws://beta.42grounds.io');//http://192.168.59.103:8080');
    var currentConsole = null;

    socket.on('connect', function() {
        // Shouldn't append anything if connection is impossible with runner.
        if (appended) return;

        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            file.innerHTML += '<div style="border-top: 1px solid #ddd; padding: 5px;"><button>Run</button><div class="line-data highlight"></div></div><div class="gist-meta">runned with &#10084; by </div><a href="http://beta.42grounds.io">Grounds</a>';

            var button = file.getElementsByTagName('button')[0],
                codeTable = file.getElementsByClassName('line-data')[0],
                console = file.getElementsByClassName('line-data')[1];

            var code = '';

            var lines = codeTable.getElementsByClassName('line');

            for (var j = 0; j < lines.length; j++) {
                var line = lines[j];

                code += line.textContent;
            }

            button.console = console;
            button.addEventListener('click', function(e){
                currentConsole = this.console;
                currentConsole.innerHTML = '';
                socket.emit('run', { language: 'ruby', code: code });
            },false);
        }
        appended = true;
    }).on('connect_error', function(err) {
        console.error(err);
    }).on('run', function(data) {
        var cssClass = '';

        if (data.stream === 'status') {
            data.chunk = '[Program exited with status: '+data.chunk+']';
            cssClass = 'pl-ent';
        } else if (data.stream == 'error') {
            cssClass = 'pl-s1';
        }

        currentConsole.innerHTML += '<pre class="line-pre"><div class="line '+cssClass+'">'+data.chunk+'</div></pre>';
    });
})();
