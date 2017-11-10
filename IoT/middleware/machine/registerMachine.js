var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {

    var machineModel = requireOption(objectrepository, 'machineModel');
    var stationModel = requireOption(objectrepository, 'stationModel');

    return function (req, res, next) {

        stationModel.findOne({
            name: req.body.station
        }, function (err, result) {
            console.log(result);
            machineModel.update(
                { name: req.body.name },
                {
                    name: req.body.name,
                    version: req.body.version,
                    station: result

                },
                { upsert: true},
                function (err, numAffected) {
                    if (err !== null) {
                        console.log(err)
                    }
                }
            );
        });
    };
}