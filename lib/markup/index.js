var embedded = require('./gist-embedded'),
    website = require('./gist-website');

// Both dependencies needs to be packaged by
// browserify and be resolved at runtime.

function initialize() {
    if (typeof(GROUNDIFY_BUILD_EXTENSION) !== 'undefined') {
        return website;
    }
    return embedded;
}

module.exports = initialize();
