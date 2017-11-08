#!/usr/bin/env node

(function() {
    "use strict";

    var homeServer = require('../lib'),
        port = process.argv[2] || 3000,
        server;

    server = homeServer.listen(port, function() {
        console.log('Serving ' + homeServer.path + ' via HTTP on ' + server.address().address + ':' + server.address().port);
    });
}());
