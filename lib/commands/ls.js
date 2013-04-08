var logger = require('../logger'),
    userData = require('../userData'),
    disk = require('yadisk-api');

module.exports = function() {
    return this
        .title('List of directory')
        .helpful()
        .arg()
            .name('path').title('path to dir')
            .def('all')
            .arr()
            .end()
        .opt()
            .name('long').title('long output')
            .short('l')
            .long('long')
            .flag()
            .end()
        .act(function(opts, args) {
            var path = args.path[0],
                long = opts.long;

            userData.get().then(function (data) {
                var yadisk = new disk(data);

                yadisk.readDir(path)
                    .then(function (dirContent) {
                        var dirs = [],
                            separator = ' ';

                        dirContent = !Array.isArray(dirContent) ? [dirContent] : dirContent;
                        dirContent.forEach(function (item) {
                            var props = item['d:propstat']['d:prop'],
                                meta = '';

                            if (long) {
                                var sizeFieldLen = 13 - props['d:getcontentlength'].toString().length;
                                meta = props['d:creationdate'] + separator + 
                                    props['d:getlastmodified'] + separator +
                                    props['d:getcontentlength'] + new Array(sizeFieldLen).join(' ');
                            }

                            dirs.push(meta + decodeURI(item['d:href']));
                        });

                        logger.info('\n' + dirs.join('\n'))
                    })
                    .fail(function (err) {
                        logger.error(err);
                        process.exit(1)
                    })
            })
            .fail(function (err) {
                logger.error(err);
                process.exit(1);
            });
        });
}
