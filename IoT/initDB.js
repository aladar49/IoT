var stationModel = require('./models/station');

exports.init = function () {
    var stations = [
        {name: 'Nyugati pályaudvar', address: '1062 Budapest, Teréz körút 55'},
        {name: 'Újpest megállóhely', address: '1138 Budapest, XIII. kerület, Balzsam u. 1.'},
        {name: 'Aquincum megállóhely', address: '1031 Budapest, III. kerület, Keled utca'},
        {name: 'Pilisvörösvár vasútállomás', address: '2085 Pilisvörösvár, Vasút utca'}
    ];

    var station = new stationModel();

    stations.forEach(function (item) {
        stationModel.update(
            {name: item.name},
            {
                name: item.name,
                address: item.address
            },
            {upsert: true},
            function(err, numAffected) {
                if (err !== null) {
                    console.log(err)
                }
            }
        );
    });
}