var server = require('./config/server.js'),
  logger = require('./config/logger.js'),
  routes = require('./config/routes.js'),
  mail = require('./config/mail.js');

/*
 * Run server
 */

server.listen(5000, function() {
  logger.info('%s listening at %s', server.name, server.url);
});
