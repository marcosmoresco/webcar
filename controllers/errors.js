var restify = require('restify'),
  server = require('../config/server.js');

server.get('/404', restify.serveStatic({
  'directory': 'views',
  'file': 'notFound.html'
}));

function redirectIfErr(req, res, err, next) {
  if (!!err) {
    if (err.statusCode === 500) {
      next(err);
    } else if (err.statusCode === 404) {
      res.redirect('/404', next);
    }
  }
}

server.on('NotFound', function(req, res, err, next) {
  redirectIfErr(req, res, err, next);
});
