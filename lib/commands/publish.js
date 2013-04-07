var logger = require('../logger'),
    userData = require('../userData'),
    disk = require('yadisk-api');

module.exports = function() {
    return this
        .title('publish')
        .helpful()
        .arg()
            .name('filename').title('file path to publish')
            .def('all')
            .arr()
            .end()
        .act(function(opts, args) {
            var filename = args.filename[0];

            userData.get().then(function(data) {
                var yadisk = new disk(data);

                yadisk.publish(filename).then(function(url) {
                    logger.info('published');
                    logger.info('url: ' + url);
                }).fail(function() {
                    logger.error('Cannot publish ', filename);
                    process.exit(1);
                });
            }).fail(function(err) {
                logger.error(err);
                process.exit(1);
            });
        });
};
