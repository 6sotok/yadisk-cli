var logger = require('../logger'),
    userData = require('../userData'),
    disk = require('yadisk-api'),
    PATH = require('path'),
    fs = require('vow-fs');

module.exports = function() {
    return this
        .title('Upload')
        .helpful('upload a file to Yandex.Disk')
        .arg()
            .name('paths').title('/path/to/local/file [/upload/to/yandex-disk/path]')
            .arr()
            .end()
        .act(function(opts, args) {
            var localPath = args.paths[0],
                remotePath = args.paths[1] || '/' + PATH.basename(localPath);

            userData.get().then(function(data) {
                var yadisk = new disk(data);
                fs.read(localPath).then(function(buf) {
                        return yadisk.put(remotePath, buf);
                }).then(function() {
                    logger.info('Uploaded to: ', remotePath);
                }).fail(function(err) {
                    logger.error(err);
                    process.exit(1);
                });
            }).fail(function(err) {
                logger.error(err);
                process.exit(1);
            });
        });
}
