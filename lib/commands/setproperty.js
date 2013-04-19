var logger = require('../logger'),
    userData = require('../userData'),
    disk = require('yadisk-api');

module.exports = function() {
    return this
        .title('Set property')
        .helpful()
        .arg()
            .name('values').title('/path/to/fileOrDir property value')
            .def('/')
            .arr()
            .end()
        .act(function(opts, args) {
            var path = args.values[0],
                property = args.values[1],
                value = args.values[2];

            userData.get().then(function (data) {
                var yadisk = new disk(data);
                yadisk.setProperty(path, property, value).then(function (resp) {
                    logger.info('ok');
                }).fail(function (err) {
                    logger.error(err);
                });
            })
            .fail(function (err) {
                logger.error(err);
                process.exit(1);
            });
        });
};
