var server = require('../config/server.js');

server.get('/hello/:name', function(req, res, next) {
  res.send(req.params);
  return next();
});
