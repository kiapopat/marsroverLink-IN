var array=[1,2,3,4,5];
var index = array.indexOf(-5);
console.log(index);
array.splice(index,1);
console.log(array);

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
