var server = require('./config/server.js'),
  logger = require('./config/logger.js'),
  routes = require('./config/routes.js'),
  statics = require('./config/statics.js');

/*
 * Configuration of statics files
 */
statics.configStatics();

/*
 * Run server
 */
server.listen(3000, function() {
  logger.info('%s listening at %s', server.name, server.url);
});
