var Schema = require('mongoose').Schema;
var db = require('../config/db');


var machine = db.model('machine', {
    name: String,
    version: String,
    station: {
        type: Schema.Types.ObjectId,
        ref: 'station'
    },
});

module.exports = machine;