var logger = require('../logger'),
    userData = require('../userData'),
    disk = require('yadisk-api');

module.exports = function() {
    return this
        .title('Create new dir on Yandex Disk')
        .helpful()
        .arg()
            .name('dirname').title('Directory name')
            .def('all')
            .arr()
            .end()
        .act(function(opts, args) {
            userData.get().then(function(data) {
                var yadisk = new disk(data),
                    dirname = args.dirname[0];

                yadisk.mkcol(dirname).then(function() {
                    logger.info('Directory created');
                }).fail(function() {
                    logger.error('Cannot create directory ', dirname);
                    process.exit(1);
                });
            }).fail(function(err) {
                logger.error(err);
                process.exit(1);
            });
        });
}
