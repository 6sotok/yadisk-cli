var logger = require('../logger'),
    userData = require('../userData'),
    disk = require('yadisk-api');

module.exports = function() {
    return this
        .title('Copy')
        .helpful()
        .arg()
            .name('dirnames').title('FROM >>> TO')
            .def('all')
            .arr()
            .end()
        .act(function(opts, args) {
            var from = args.dirnames[0];
                to = args.dirnames[1];

            userData.get().then(function(data) {
                var yadisk = new disk(data);

                yadisk.copy(from, to).then(function() {
                    logger.info('Copied');
                }).fail(function() {
                    logger.error('Cannot copied ', from);
                    process.exit(1);
                });
            }).fail(function(err) {
                logger.error(err);
                process.exit(1);
            });
        });
}
