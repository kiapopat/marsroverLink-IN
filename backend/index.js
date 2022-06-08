const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const time = new Date();

app.use(express.json()); //necessary to access json objects

//rover and obstacle data will both be coming in from the ESP32 microcontroller


//sample rover data
const rover = {
	"x":50,
	"y":100,
	"angle":69,
	"lastUpdate": 1999,
	"battery":50
};

//sample obstacle data
const obstacles = {
	"pink":{
		"x":1,
		"y":3
	},
	"green":{
		"x":5,
		"y":0
	},
	"blue":{
		"x":7,
		"y":10
	},
	"orange":{
		"x":42,
		"y":6
	},
	"black":{
		"x":9,
		"y":3
	}
};

//handles obstacle data get requests, returns a json object
app.get("/obstacles", (req,res) => {
	res.json({
		pink: [obstacles.pink.x, obstacles.pink.y],
		blue: [obstacles.blue.x, obstacles.blue.y],
		green: [obstacles.green.x, obstacles.green.y],
		black: [obstacles.black.x, obstacles.black.y],
		orange: [obstacles.orange.x, obstacles.orange.y]
	});
})

//handles rover data get requests, returns a json object
app.get("/rover", (req,res) => {
	res.json({xcoord: rover.x,
            ycoord: rover.y,
            angle: rover.angle,
            battery: rover.battery,
			latest: rover.lastUpdate});
});

//handles post request for input coordinates
app.post("/coords", (req,res) => {
	console.log("x input:", req.body.x, " y input:", req.body.y);
	//send to ESP32
	res.send("coords received");
});


//instantiate server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});