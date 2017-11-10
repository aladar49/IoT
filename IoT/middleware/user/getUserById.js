var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository,'userModel');

    return function (req, res, next) {
        //not enought parameter
        if ((typeof req.session.id === 'undefined') || (req.session.id === 'null')) {
            return next();
        }

        //lets find the user
        userModel.findOne({ _id: req.session.userid}, function (err, result) {
            if (err) {
                return next(err);
            }
            res.tpl.user = result;

            return next();
        });
    };
};