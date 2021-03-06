var logger = require('../logger'),
    userData = require('../userData'),
    disk = require('yadisk-api');

module.exports = function() {
    return this
        .title('unpublish')
        .helpful()
        .arg()
            .name('filename').title('Path to unpublish')
            .def('all')
            .arr()
            .end()
        .act(function(opts, args) {
            var filename = args.filename[0];

            userData.get().then(function(data) {
                var yadisk = new disk(data);

                yadisk.unpublish(filename).then(function() {
                    logger.info('unpublished');
                }).fail(function() {
                    logger.error('Cannot unpublish ', filename);
                    process.exit(1);
                });
            }).fail(function(err) {
                logger.error(err);
                process.exit(1);
            });
        });
};
