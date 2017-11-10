var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {
    return function (req, res, next) {
        var machineStatusModel = requireOption(objectrepository, 'machineStatusModel');
        var machineModel = requireOption(objectrepository, 'machineModel');

        machineModel.findOne({
            name: req.body.machine
        }, function (err, result) {
            var status = new machineStatusModel();
            status.timestamp = new Date(req.body.timestamp);
            status.stockStatus = req.body.stockStatus;
            status.machineHealth = req.body.machineHealth;
            status.machine = result;
            status.save(function (err, result) {

            });
        }
        );
    };
}