var embedded = require('./gist-embedded'),
    website = require('./gist-website');

if (BUILD_TARGET === 'extension') {
    module.exports = website;
} else {
    module.exports = embedded;
}
