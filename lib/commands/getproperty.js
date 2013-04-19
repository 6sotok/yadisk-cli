var logger = require('../logger'),
    userData = require('../userData'),
    disk = require('yadisk-api');

module.exports = function() {
    return this
        .title('Get property')
        .helpful()
        .arg()
            .name('path').title('/path/to/fileOrDir [property]')
            .def('/')
            .arr()
            .end()
        .act(function(opts, args) {
            var path = args.path[0],
                property = args.path[1];

            userData.get().then(function (data) {
                var yadisk = new disk(data);
                yadisk.getProperty(path, property).then(function (resp) {
                    if (typeof resp == 'object') {
                        var data = [];
                        for (var key in resp) {
                            if (resp.hasOwnProperty(key)) {
                                data.push(key.substr(2) + ': ' + resp[key]);
                            }
                        }
                        logger.info(data.join('\n'));
                    } else {
                        logger.info(resp);
                    }
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
