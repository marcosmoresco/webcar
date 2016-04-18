var nodemailer = require('nodemailer'),
  logger = require('./logger');

var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: 'marcoshoppusmoresco@gmail.com',
    pass: 'always18244'
  },
  //proxy config
  // assumes a HTTP proxy running on port 3128
  proxy: 'http://10.32.8.117:8080'
};


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);

// setup e-mail data with unicode symbols
var mailOptions = {
  from: '"Fred Foo 👥" <marcoshoppusmoresco@gmail.com>', // sender address
  to: 'marcoshoppusmoresco@gmail.com', // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world 🐴', // plaintext body
  html: '<b>Hello world 🐴</b>' // html body
};

var exports = module.exports = {};

exports.sendMail = function() {
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return logger.error(error);
    }
    logger.info('Message sent: ' + info.response);
  });
};
