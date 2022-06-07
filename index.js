const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const time = new Date();

//rover data coming in here from ESP32

const rover = {
	"x":50,
	"y":100,
	"angle":69,
	"lastUpdate": 1999,
	"battery":50
};


app.get("/coords", (req,res) => {
	res.json({xcoord: rover.x,
            ycoord: rover.y,
            angle: rover.angle,
            battery: rover.battery,
			latest: rover.lastUpdate});
		console.log("request received");
});


/*app.get("/coords", (req,res) => {
	let response = {
		'coordinateX': rover.x, //Rover coordinate x
		'coordinateY': rover.y, //Rover coordinate y
		'battery': rover.battery, //Rover angle
	};
	res.send(response);
	console.log("request received");
	console.log(response);
});*/




app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});