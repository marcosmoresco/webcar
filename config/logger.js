var moment = require('moment'),
  log4js = require('log4js'),
  logger = log4js.getLogger('webcar');

log4js.configure({
  appenders: [{
    type: 'file',
    filename: 'logs/webcar-' + moment().format('DD-MM-YYYY HH:mm:ss') + '.log',
    maxLogSize: 20480,
    backups: 3,
    category: 'webcar'
  }, {
    type: 'console',
    filename: 'logs/webcar.log',
    maxLogSize: 20480,
    backups: 3,
    category: 'webcar'
  }]
});

module.exports = logger;
