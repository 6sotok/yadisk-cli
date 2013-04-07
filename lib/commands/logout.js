
var logger = require('../logger'),
    userData = require('../userData');

module.exports = function() {
    return this
        .title('Login to Yandex Disk')
        .helpful()
        .act(function(opts, args) {
            userData.erase();
        });
};

