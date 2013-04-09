var logger = require('../logger'),
    userData = require('../userData'),
    disk = require('yadisk-api'),
    PATH = require('path'),
    fs = require('fs');

module.exports = function() {
    return this
        .title('Download file')
        .helpful()
        .arg()
            .name('path').title('/path/to/file /download/to')
            .def('all')
            .arr()
            .end()
        .act(function(opts, args) {
            var path = args.path[0],
                downloadTo = args.path[1] || './';

            userData.get().then(function(data) {
                var yadisk = new disk(data);

                if (!fs.existsSync(downloadTo)) {
                    fs.mkdirSync(downloadTo);
                }

                yadisk.get(path).then(function(data) {
                    var buff = new Buffer(data.data, 'binary'),
                        fd = fs.openSync(PATH.resolve(downloadTo, PATH.basename(path)), 'w');

                    fs.writeSync(fd, buff, 0, buff.length, 0);
                    fs.closeSync(fd);

                    logger.info('Done');
                }).fail(function(err) {
                    logger.error(err);
                });
            }).fail(function(err) {
                logger.error(err);
                process.exit(1);
            });
        });
}
