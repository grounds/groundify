var embedded = require('./embedded'),
    gistWebsite = require('./gist-website');

if (BUILD_TARGET === 'extension') {
    module.exports = gistWebsite;
} else {
    module.exports = embedded;
}
