var requireOption = require('../common').requireOption;

module.exports = function (objectrepository) {
    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        if ((typeof req.body === 'undefined') ||
            (typeof req.body.name === 'undefined') ||
            (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {
            return next();
        }

        var user = undefined;
        if (typeof res.tpl.user !== 'undefined') {
            user = res.tpl.user;
        } else {
            user = new userModel();
        }

        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save(function (err, result) {
            return res.redirect('/machineStatus');
        });
    };

};