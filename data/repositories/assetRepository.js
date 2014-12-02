var _ = require("underscore"),
    q = require("q"),
    config = require("../../config"),
    path = require("path"),
    fs = require("fs");

module.exports = {
    all: getAllFiles
};

function getAllFiles() {
    var deferred = q.defer();

    fs.readdir(config.assets.uploadFolder, function(error, paths) {
        var files = [];

        _.forEach(paths, function(path) {
            var stats = fs.statSync(config.assets.uploadFolder + path);

            files.push({
                name: path.replace(/^.*[\\\/]/, ''),
                size: stats.size,
                created: stats.ctime
            })
        });

        deferred.resolve(files);
    });

    return deferred.promise;
}

