var embedded = require('./gist-embedded'),
    website = require('./gist-website');

// Both dependencies needs to be packaged by
// browserify and be resolved at runtime.

function initialize() {
    switch(GROUNDIFY_BUILD_TARGET) {
        case 'extension':
            return website;
        default:
            return embedded;
    }
}

module.exports = initialize();