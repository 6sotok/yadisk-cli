var logger = require('../logger'),
    userData = require('../userData');

module.exports = function() {
    return this
        .title('Login to Yandex Disk')
        .helpful()
        .act(function(opts, args) {
            userData.erase();
            userData.get().then(function() {
                logger.info('Logged');
            }).fail(function(err) {
                logger.error('Failed with error: ' + err);
                process.exit(1);
            });
        });
}
