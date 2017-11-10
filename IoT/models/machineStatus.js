var Schema = require('mongoose').Schema;
var db = require('../config/db');


var machineStatus = db.model('machineStatus', {
    machine: {
        type: Schema.Types.ObjectId,
        ref: 'machine'
    },
    timestamp: { type : Date },
    stockStatus: String,
    machineHealth: String
});

module.exports = machineStatus;