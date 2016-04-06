var restify = require('restify');

var server = restify.createServer({
  name: 'webcar',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

module.exports = server;
