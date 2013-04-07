var logger = require('../logger'),
    userData = require('../userData'),
    disk = require('yadisk-api');

module.exports = function() {
    return this
        .title('Move')
        .helpful()
        .arg()
            .name('pathnames').title('/path/to/file /new/path')
            .def('all')
            .arr()
            .end()
        .act(function(opts, args) {
            var from = args.pathnames[0];
                to = args.pathnames[1];

            userData.get().then(function(data) {
                var yadisk = new disk(data);

                yadisk.move(from, to).then(function() {
                    logger.info('Moved');
                }).fail(function() {
                    logger.error('Cannot move ', from);
                    process.exit(1);
                });
            }).fail(function(err) {
                logger.error(err);
                process.exit(1);
            });
        });
}
