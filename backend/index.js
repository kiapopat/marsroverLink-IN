const express = require("express");

const mysql = require("mysql");

const PORT = process.env.PORT || 3001;

const app = express();

const time = new Date();

const path = require("./pathfinding.js");

app.use(express.json()); //necessary to access json objects

//rover and obstacle data will both be coming in from the ESP32 microcontroller

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'esp_data'
});

connection.connect(function(error){
	if(!!error) {
		console.log(error);
	}
	else{
		console.log("connected to db");
	}
})



//handles obstacle data get requests, returns a json object
app.get("/obstacles", (req,res) => {
	//console.log("test");
	connection.query("SELECT * FROM obstacles", function(error, rows, fields) {
		var obstacles = [];

		if(!!error){
			console.log(error);
		}
		else{
			for (let i = 0; i < rows.length ; i++) {
					let obstacle = {
					//"id":rows[i].id,
					"colour":rows[i].colour,
					"x":rows[i].xcoord,
					"y":rows[i].ycoord
					}	
					obstacles.push(obstacle);
				}
				res.send(obstacles);
		}	
	});
})

//handles rover data get requests, returns a json object
app.get("/battery", (req,res) => {
	connection.query("SELECT battery FROM rover WHERE id = 1", function(error, rows, fields) {		

		if(!!error){
			console.log(error);
		}
		else{
			res.send(rows[0]);
		}
		//console.log("rover position x=",rows[0].xcoord," y=",rows[0].ycoord)	
	});
})

app.get("/rover", (req,res) => {
	connection.query("SELECT * FROM rover", function(error, rows, fields) {		

		if(!!error){
			console.log(error);
		}
		else{
			res.json({xcoord: rows[0].xcoord,
				ycoord: rows[0].ycoord,
				angle: rows[0].angle,
				battery: rows[0].battery,
				latest: rows[0].lastUpdate});
		}
		//console.log("rover position x=",rows[0].xcoord," y=",rows[0].ycoord)	
	});

})


//handles post request for input coordinates
app.post("/coords", (req,res) => {

	var pos = {
		x:null,
		y:null
	};

	var dest = {
		x:null,
		y:null
	};

	var obstacles = [];

	res.send("coords received");
	dest.x = req.body.x;
	dest.y = req.body.y;

	connection.query("SELECT * FROM rover", function(error, rows, fields) {	
        
		if(!!error){
			console.log(error);
		}
		else{
			pos.x = rows[0].xcoord;
			pos.y = rows[0].ycoord;

			connection.query("SELECT * FROM obstacles", function(error, rows, fields) {
				if(!!error){
					console.log(error);
				}
				else{
					for (let i = 0; i < rows.length ; i++) {
							let obstacle = {
							"x":rows[i].xcoord,
							"y":rows[i].ycoord
							}	
							obstacles.push(obstacle);
							//console.log(obstacles);
							//console.log("position=", pos, " dest=", dest," obstacles=", obstacles);	
							output = path.pathGenerator(dest, pos, obstacles);
							//console.log("path=", output);
						}
						console.log("path=", output);
						for(i=0; i<output.length; i++){
							connection.query("INSERT INTO path (id, x, y) VALUES("+i+","+output[i].x+","+output[i].y+")", function(error) {
								if(!!error){
									console.log(error);
								}
								else{
									console.log("path set");
								}
							});
						}
				}	
			});
		}
	});
	connection.query("UPDATE mode SET pathfinding = 1, explore = 0, controlled = 0 WHERE id = 1", function(error) {
		if(!!error){
			console.log(error);
		}
		else{
			console.log("Set mode to pathfinding");
		}
	});
});

app.post("/move", (req,res) => {
	res.send("direction received");
	let direction = req.body.direction;

	connection.query("UPDATE mode SET pathfinding = 0, explore = 0, controlled = 1 WHERE id = 1", function(error) {
		if(!!error){
			console.log(error);
		}
		else{
			console.log("Set mode to controlled");
		}
	});
	
	//send to ESP32
	if(direction == "l"){
		connection.query("UPDATE motors SET speed_left = 50, speed_left2 = 50, speed_right = -50, speed_right2 = -50 WHERE id = 1", function(error) {
			if(!!error){
				console.log(error);
			}
			else{
				console.log("Set motors to left");
			}
		});
	}

	else if(direction == "r"){
		connection.query("UPDATE motors SET speed_left = -50, speed_left2 = -50, speed_right = 50, speed_right2 = 50 WHERE id = 1", function(error) {
			if(!!error){
				console.log(error);
			}
			else{
				console.log("Set motors to right");
			}
		});
	}

	else if(direction == "f"){
		connection.query("UPDATE motors SET speed_left = 70, speed_left2 = 50, speed_right = 77, speed_right2 = 50 WHERE id = 1", function(error) {
			if(!!error){
				console.log(error);
			}
			else{
				console.log("Set motors to forward");
			}
		});
	}

	else if(direction == "b"){
		connection.query("UPDATE motors SET speed_left = -70, speed_left2 = -50, speed_right = -77, speed_right2 = -50 WHERE id = 1", function(error) {
			if(!!error){
				console.log(error);
			}
			else{
				console.log("Set motors to backward");
			}
		});
	}

	else if(direction == "s"){
		connection.query("UPDATE motors SET speed_left = 0, speed_left2 = 0, speed_right = 0, speed_right2 = 0 WHERE id = 1", function(error) {
			if(!!error){
				console.log(error);
			}
			else{
				console.log("Set motors to stop");
			}
		});
	}


});



//instantiate server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
