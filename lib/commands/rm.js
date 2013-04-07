var logger = require('../logger'),
    userData = require('../userData'),
    disk = require('yadisk-api');

module.exports = function() {
    return this
        .title('Remove')
        .helpful()
        .arg()
            .name('path').title('Path to remove')
            .def('all')
            .arr()
            .end()
        .act(function(opts, args) {
            userData.get().then(function(data) {
                var yadisk = new disk(data),
                    path = args.path[0];

                yadisk.delete(path).then(function() {
                    logger.info('Removed');
                }).fail(function() {
                    logger.error('Cannot remove ', path);
                    process.exit(1);
                });
            }).fail(function(err) {
                logger.error(err);
                process.exit(1);
            });
        });
}
