var constants = require('./constants'),
    Client = require('./client');

var _ = new Client(constants.runnerURL).start();