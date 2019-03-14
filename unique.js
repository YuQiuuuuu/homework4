var fetch    = require('node-fetch');
var low      = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter  = new FileSync('db.json');
var db       = low(adapter);

// Set some defaults
db.defaults({ vehicles: [] }).write()

var vehicles = db.get('vehicles').value()


var result = new Set(vehicles.map(vehicle => vehicle.id));

// console.log('id = ' + result);
console.log('id = ' + Array.from(result));