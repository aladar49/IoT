var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    var stationModel = requireOption(objectrepository, 'stationModel');

    return function (req, res, next) {

        stationModel.find({
        },function (err, results) {
            if (err) {
                return next(new Error('Error getting stations.'));
            }

            res.tpl.stations = results;
            return next();
        });
    };

};