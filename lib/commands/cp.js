var logger = require('../logger'),
    userData = require('../userData'),
    disk = require('yadisk-api');

module.exports = function() {
    return this
        .title('Copy')
        .helpful('Copy files and directories within the Yandex.Disk file structure')
        .arg()
            .name('pathnames').title('/path/from /path/to')
            .req()
            .arg()
            .end()
        .act(function(opts, args) {
            var from = args.pathnames[0];
                to = args.pathnames[1];

            userData.get().then(function(data) {
                var yadisk = new disk(data);

                yadisk.copy(from, to).then(function() {
                    logger.info('Copied');
                }).fail(function(err) {
                    logger.error(err);
                    logger.error('Cannot copied ', from);
                    process.exit(1);
                });
            }).fail(function(err) {
                logger.error(err);
                process.exit(1);
            });
        });
}
