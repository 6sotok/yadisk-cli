var winston = require('winston'),
    logger = new (winston.Logger)({
    transports: [
          new (winston.transports.Console)(),
          new (winston.transports.File)({ filename: 'yadisk.log' })
        ]
    });

module.exports = logger;
