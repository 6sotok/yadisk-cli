var logger = require('../logger'),
    userData = require('../userData'),
    disk = require('yadisk-api');

module.exports = function() {
    return this
        .title('mv')
        .helpful()
        .arg()
            .name('dirnames').title('FROM >>> TO')
            .def('all')
            .arr()
            .end()
        .act(function(opts, args) {
            var from = args.dirnames[0];
                to = args.dirnames[1];

            userData.get().then(function(data) {
                var yadisk = new disk(data);

                console.log(yadisk.move.toString());
                yadisk.move(from, to).then(function() {
                    logger.info('Moved');
                }).fail(function() {
                    logger.error('Cannot move ', from);
                });
            }).fail(function(err) {
                logger.error(err);
                process.exit(1);
            });
        });
}
