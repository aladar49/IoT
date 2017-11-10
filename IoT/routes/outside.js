var mainRedirectMW = require('../middleware/generic/mainRedirect');
var inverseAuthMW = require('../middleware/generic/inverseAuth');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var checkUserRegistrationMW = require('../middleware/user/checkUserRegistration');
var renderMW = require('../middleware/generic/render');
var logoutMW = require('../middleware/generic/logout');

var userModel = require('../models/user');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel
    };

    app.get('/',
        mainRedirectMW(objectRepository)
    );

    app.use('/login',
        inverseAuthMW(objectRepository),
        checkUserLoginMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    app.get('/logout',
        logoutMW(objectRepository),
        function(req, res, next){
            res.redirect('/');
        }
    );

    app.use('/create_account',
        inverseAuthMW(objectRepository),
        checkUserRegistrationMW(objectRepository),
        renderMW(objectRepository, 'create_account')
    );

};