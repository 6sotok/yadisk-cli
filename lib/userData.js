/*
 * userData.js
 * Ищет файл с токеном или спрашивает логин пароль
 */

var vow = require('vow'),
    read = require('read'),
    path = require('path-extra'),
    util = require('yadisk-api/lib/util'),
    fs = require('fs'),
    yadiskrc = path.resolve(path.homedir(), '.yadiskrc');

function put (data) {
    var promise = new vow.promise();

        var userData = util.toBase64(data.login + ':' + data.password);
        fs.writeFileSync(yadiskrc, JSON.stringify({
            auth: 'basic',
            string: userData
        }));
        promise.fulfill();

        return promise;
}

module.exports = {
    get: function () {
        var promise = new vow.promise();

        if (!fs.existsSync(yadiskrc)) {
            read({ prompt: 'Login: '}, function(err, login) {
                if (!login || err)
                    promise.reject('Some problems with login');

                read({ prompt: 'Password: ', silent: true}, function(err, password) {
                    if (!password || err)
                        promise.reject('Some problems with password');

                    put({
                        login: login,
                        password: password
                    });
                    promise.fulfill({
                        login: login,
                        password: password
                    });
                });
            });
        } else {
            var userData = JSON.parse(fs.readFileSync(yadiskrc));
            if (userData.auth === 'basic') {
                userData = util.fromBase64(userData.string);
                promise.fulfill({
                    login: userData.split(':')[0],
                    password: userData.split(':')[1]
                });
            }
            // TODO oauth?
        }
        return promise;
    },

    erase: function() {
        if (!fs.existsSync(yadiskrc)) {
            return;
        }
        fs.unlinkSync(yadiskrc);
    }
};

