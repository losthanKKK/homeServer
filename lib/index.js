(function () {
  "use strict";

  var connect = require('connect')
    , pathname = process.cwd()
    , util = require('util')
    , fs = require('fs')
    , url = require('url')
    , path = require('path')
    , app
    , version = JSON.parse(fs.readFileSync(path.join(__dirname, '/../package.json'), 'utf8')).version
    ;

  app = connect()
  .use(function middleware1(req, res, next) {
    if (req.method.toUpperCase() == 'POST') {
        res.writeHead(200, {
            'Content-Type': 'text/plain;charset=utf-8'
        });
        var filename = url.parse(req.url).pathname.replace(/.*\//, ''),
            ws, err;
        console.log(filename || "no filename")
        console.log('Receiving ' + filename + ' ');
        try {
            fs.statSync(filename);
        } catch (e) {
            err = e;
        }

        if (!err) {
            console.log('hmm... that file exists, cancelling');
            res.end();
            return;
        }
        ws = fs.createWriteStream(filename);
        ws.on('error', function(err) {
            console.log('Had some problem... cancelling');
            console.error(err.message);
            res.end(err.message, 500);
        });
        req.on('data', function(chunk) {
            ws.write(chunk);
            console.log('.');
        });
        req.on('end', function() {
            ws.end();
            res.end();
            console.log(' done!');
        });
      } else {
          next();
      }
  });
  app.use(connect.static(pathname));
  app.use(connect.directory(pathname));
  app.use(function(req, res){
    res.end('Hello from Connect!\n');
  });
  module.exports = app;
  module.exports.path = pathname;
}());
