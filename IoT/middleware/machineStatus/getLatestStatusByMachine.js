var requireOption = require('../common').requireOption;
var moment = require('moment');
var ObjectId = require('mongodb').ObjectID;


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