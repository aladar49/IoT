var requireOption = require('../common').requireOption;
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID;

/**
 * Get the reservation list and put the reservation on res.tpl.reservation
 */
module.exports = function (objectrepository) {
    var machineStatusModel = requireOption(objectrepository, 'machineStatusModel');

    return function (req, res, next) {
        machineStatusModel.aggregate([
            { $sort: { timestamp: -1} },
            { $lookup: {
                from: "machines",
                localField: "machine",
                foreignField: "_id",
                as: "machineName"
            }},
            { $unwind: "$machineName" },

            { $lookup: {
                from: "stations",
                localField: "machineName.station",
                foreignField: "_id",
                as: "stationName"
            }},
            { $unwind: "$stationName" },

            { $match: { "stationName.name": req.query.station,
                        "timestamp": { $gte: moment(req.query.date).add(-30, 'm').toDate() },
                        "timestamp": { $lt: moment(req.query.date).add(30, 'm').toDate() }
            } },

            { $group: {
                _id: "$machineName.name",
                timestamp: { $first: '$timestamp'},
                stockStatus: { $first: '$stockStatus'},
                machineHealth: { $first: '$machineHealth'},
                station: { $first: '$stationName.name'}

            }}
        ]).exec(function(error,results){
            res.tpl.machineStatusList = results;
            res.tpl.moment = moment;
            return next();
        });

    };

};