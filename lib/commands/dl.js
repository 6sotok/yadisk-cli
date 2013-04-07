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
            .name('path').title('Path to file on Yandex Disk')
            .def('all')
            .arr()
            .end()
        .act(function(opts, args) {
            var path = args.path[0];

            userData.get().then(function(data) {
                var yadisk = new disk(data);

                yadisk.get(path).then(function(data) {
                    // FIXME выбор директории
                    var fd =  fs.openSync(PATH.resolve('./out', PATH.basename(path)), 'w'),
                        buff = new Buffer(data.data, 'binary');

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
