var Schema = require('mongoose').Schema;
    var db = require('../config/db');

var user = db.model('user',{
    name: String,
    email: String,
    password: String,
});

module.exports = user;