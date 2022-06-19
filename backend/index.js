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
					"id":rows[i].id,
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
	/*res.json({xcoord: 7,
		ycoord: 5,
		angle: 20,
		battery: 50,
		latest: 1999});*/
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

	connection.query("SELECT * FROM rover", getpos = function(error, rows, fields) {	
        
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
							console.log("position=", pos, " dest=", dest," obstacles=", obstacles);	
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

	/*connection.query("SELECT * FROM rover", getpos = function(error, rows, fields, callback) {	
			
		if(!!error){
			console.log(error);
		}
		else{
			pos.x = rows[0].xcoord;
			pos.y = rows[0].ycoord;
		}
		callback(null, pos);
	});

	console.log(pos);

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
					console.log(obstacles);
				}
		}	
	});*/

	//console.log("position=", pos, " dest=" ,dest, " obstacles", obstacles);	
	//send to pathfinding algorithm
});

app.post("/move", (req,res) => {
	res.send("direction received");
	let direction = req.body.direction;
	
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

/*var num_obstacles;
connection.query("SELECT COUNT(ID) AS NUM FROM obstacles", function(error, rows, fields) {
		if(!!error){
			console.log(error);
		}
		else{
			console.log("Success");
			console.log(rows);
			num_obstacles = rows[0].NUM;
			//console.log(rows[0].NUM);
			//console.log(num_obstacles);
		}
});*/


/*var test;

function getObstacles() {
	connection.query("SELECT * FROM obstacles", function(error, rows, fields) {
		var obstacles = [];

		if(!!error){
			console.log(error);
		}
		else{
			for (let i = 0; i < rows.length ; i++) {
				//console.log("id =",rows[i].id, " colour =", rows[i].colour, " x=", rows[i].xcoord, " y=", rows[i].ycoord);
					var obstacle = {
					"id":rows[i].id,
					"colour":rows[i].colour,
					"x":rows[i].xcoord,
					"y":rows[i].ycoord
					}	
					obstacles.push(obstacle);
					//console.log(obstacles);
				}
				//console.log(obstacles);
				return obstacles;
		}	
	});
}

test = getObstacles();

console.log("bye", test);*/



/*app.get("/", function(req,res) {
	connection.query("SELECT * FROM motors WHERE id = 1", function(error, rows, fields) {
		if(!!error){
			console.log(error);
		}
		else{
			//console.log("Success");
			//console.log(rows); 
			//console.log(rows[0].speed_left);
			test = getObstacles();
			console.log(test);
		}
	});
})*/

//var speed = 60;
/*app.get("/", function(req,res) {
	connection.query("UPDATE motors SET speed_left = " + speed + " WHERE id = 1", function(error) {
		if(!!error){
			console.log(error);
		}
		else{
			console.log("Success");
			connection.query("SELECT * FROM motors WHERE id = 1", function(error, rows, fields) {
				console.log(rows[0].speed_left);
			});
			//console.log(rows);
			//console.log(rows[0].speed_left);
		}
	});
})

*///sample rover data
/*const rover = {
	"x":null,
	"y":null,
	"angle":null,
	"lastUpdate": null,
	"battery":null
};*/
//sample obstacle data
/*const obstacles = {
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
};//*/