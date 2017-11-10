var Schema = require('mongoose').Schema;
var db = require('../config/db');


var station = db.model('station', {
    name: String,
    address: String
});

module.exports = station;