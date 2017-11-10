// Machine details
var uri = "http://localhost:8080";
var healthCheckTime = 500;
var machineId = "machine1";
var stockStatus = "FULL";
var machineHealth = "READY";
var station = "Nyugati pályaudvar";
var version = "3.2.1";

var Client = require('node-rest-client').Client;
var sleep = require('system-sleep');

var client = new Client();

client.registerMethod("register",  uri + "/register", "POST");
var args = {
    data: {name: machineId, station: station, version: version},
    headers: {"Content-Type": "application/json"}
}
client.methods.register(args, function (data, response) {
    console.log(data);
});

client.registerMethod("healthCheckMethod",  uri + "/machineStatus/create", "POST");

while(true) {
    sleep(5000);
    if(Math.random() >= 0.8){
        machineHealth = "DOWN";
    } else {
        machineHealth = "READY";
    }
    args = {
        data: {
            machine: machineId,
            stockStatus: stockStatus,
            machineHealth: machineHealth,
            timestamp: Date.now(),
            station: station
        },
        headers: {"Content-Type": "application/json"}
    }

    client.methods.healthCheckMethod(args, function (data, response) {
        // parsed response body as js object
        console.log(data);
        // raw response
        console.log(response);
    });
}