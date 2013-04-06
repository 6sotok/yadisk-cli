/*
 * userData.js
 * Ищет файл с токеном или спрашивает логин пароль
 * TODO файл с токеном
 */

var vow = require('vow'),
    read = require('read'),
    path = require('path-extra'),
    util = require('yadisk-api/lib/util'),
    fs = require('fs');

// TODO сохранение
function put (data) {
    var promise = new vow.promise();

    promise.fulfill();

    return promise;
}

module.exports = {
    get: function () {
        var promise = new vow.promise();

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

        return promise;
    },

}

