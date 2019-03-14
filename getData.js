var fetch    = require('node-fetch');
var low      = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter  = new FileSync('db.json');
var db       = low(adapter);

// Set some defaults
db.defaults({ vehicles: [] }).write()

// Request bus data from MBTA
async function getBusLocations(){
	var url = 'https://api-v3.mbta.com/vehicles?api_key=ca34f7b7ac8a445287cab52fb451030a&filter[route]=1&include=trip';	
	var response = await fetch(url);
	var json     = await response.json();
	console.log(json.data)
	return json.data;
}



async function run(){
	console.log("inside run")
	var vehicle = await getBusLocations();
    vehicle.forEach( bus => {
		db.get('vehicles')
		.push(bus)
		.write();
	})
	// db.get('vehicles')
	// .push({vehicle})
	// .write();
	

	// setInterval(run,15000)
		
	
}

var startTime = new Date().getTime();
var intervalID = setInterval(() =>{
	console.log("setInterval")
	if(new Date().getTime() - startTime > 1000 * 60 * 60){
		console.log("stop time")
		clearInterval(intervalID);
		return ;
	}
	run();
},15000)
// run();