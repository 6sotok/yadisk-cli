
var logger = require('../logger'),
    userData = require('../userData');

module.exports = function() {
    return this
        .title('Forget current user data')
        .helpful()
        .act(function(opts, args) {
            userData.erase();
        });
};

