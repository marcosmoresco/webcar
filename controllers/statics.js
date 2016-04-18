var server = require('../config/server.js'),
  restify = require('restify');

server.get(/\/public\/dist\/?.*/, restify.serveStatic({
  'directory': __dirname + '/../'
}));
