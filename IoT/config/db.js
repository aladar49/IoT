var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Iot');

module.exports = mongoose;