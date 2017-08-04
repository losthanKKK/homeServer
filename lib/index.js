(function () {
  "use strict";

  var connect = require('connect')
    , pathname = process.cwd()
    , util = require('util')
    , mkdirp = require('mkdirp')
    , fs = require('fs')
    , url = require('url')
    , path = require('path')
    , app
    , dirpath
    , version = JSON.parse(fs.readFileSync(path.join(__dirname, '/../package.json'), 'utf8')).version
    ;



  app = connect()
  .use(function middleware(req, res, next) {
    if (req.method.toUpperCase() == 'POST') {
        res.writeHead(200, {
            'Content-Type': 'text/plain;charset=utf-8'
        });
        dirpath = path.normalize('/' + url.parse(req.url).pathname).split('/');
        dirpath.pop();  // trailing filename
        dirpath.shift(); // leading nothing
        dirpath = dirpath.join('/');
        try {
          mkdirp.sync(path.join(pathname, dirpath));
        } catch(e) {
          dirpath = '.';
        }

        var filename = url.parse(req.url).pathname.replace(/.*\//, ''),
            ws, err;
        var dirfilename = path.join(pathname, dirpath, filename)
        console.log('Receiving ' + filename + ' ');

        fs.open(dirfilename, 'wx', (err, fd) => {
          if (err) {
            if (err.code === 'EEXIST') {
                console.log('hmm... that file exists, cancelling');
                res.end();
                return;
            }

            throw err;
          }

          ws = fs.createWriteStream(dirfilename);
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
  app.use('/version', function (req, res, next) {
      res.end(version);
  })
  module.exports = app;
  module.exports.path = pathname;
}());
