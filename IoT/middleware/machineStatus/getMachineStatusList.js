var requireOption = require('../common').requireOption;
var moment = require('moment');

module.exports = function (objectrepository) {

    var machineStatusModel = requireOption(objectrepository, 'machineStatusModel');

    return function (req, res, next) {

        machineStatusModel.find({
        },function (err, results) {
            if (err) {
                return next(new Error('Error getting machineStatus'));
            }

            res.tpl.machineStatusList = results;
            resp.tpl.moment = moment;
            return next();
        });
    };

};