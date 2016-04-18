var restify = require('restify'),
  server = require('../config/server.js');


server.get('/', restify.serveStatic({
  'directory': 'views',
  'default': 'index.html'
}));

server.get('/index/:name', function(req, res, next) {
  res.send(req.params);
  return next();
});

server.get('/favicon.ico', restify.serveStatic({
  'directory': 'public/images',
  'file': 'favicon.ico'
}));
