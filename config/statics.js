var server = require('./server'),
  restify = require('restify');


exports.configStatics = function() {
  server.get(/\/public\/dist\/?.*/, restify.serveStatic({
    'directory': __dirname + '/../'
  }));
};
