var authMW = require('../middleware/generic/auth');
var renderMW = require('../middleware/generic/render');
var getLatestStatusByMachineMW = require('../middleware/machineStatus/getLatestStatusByMachine');
var getMachineStatusListByStationMW = require('../middleware/machineStatus/getMachineStatusListByStaion');
var createMachineStatusMW = require('../middleware/machineStatus/createMachineStatus');
var registerMachineMW = require('../middleware/machine/registerMachine');
var checkUserLoginMW = require('../middleware/user/checkUserLogin');
var getStationListMW = require('../middleware/station/getStationList');
var updateUserDetailsMW = require('../middleware/user/updateUserDetails');
var getUserByIdMW = require('../middleware/user/getUserById');
var deleteUserMW = require('../middleware/user/deleteUser');
var machineStatusModel = require('../models/machineStatus');
var machineModel = require('../models/machine');
var stationModel = require('../models/station');
var userModel    = require('../models/user');

module.exports = function (app) {
    var objectRepository = {
        machineStatusModel: machineStatusModel,
        machineModel: machineModel,
        stationModel: stationModel,
        userModel: userModel
    };

    app.post('/machineStatus/create',
        createMachineStatusMW(objectRepository)
    );

    app.get('/machineStatus',
        authMW(objectRepository),
        getUserByIdMW(objectRepository),
        getStationListMW(objectRepository),
        getLatestStatusByMachineMW(objectRepository),
        renderMW(objectRepository, 'machineStatus')
    );

    app.post('/register',
        registerMachineMW(objectRepository)
    );

    app.get('/getStatusByStation',
        authMW(objectRepository),
        getUserByIdMW(objectRepository),
        getStationListMW(objectRepository),
        getMachineStatusListByStationMW(objectRepository),
        renderMW(objectRepository, 'machineStatus')
    );

    app.use('/profil',
        authMW(objectRepository),
        getUserByIdMW(objectRepository),
        updateUserDetailsMW(objectRepository),
        renderMW(objectRepository, 'profil')
    );

    app.use('/user/delete',
        authMW(objectRepository),
        getUserByIdMW(objectRepository),
        deleteUserMW(objectRepository)
    );
};
