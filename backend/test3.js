const express = require("express");

const mysql = require("mysql");

const PORT = process.env.PORT || 3002;

const app = express();

const time = new Date();

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

var y = 0;
var x = 0;
setInterval(function(){ 
    connection.query("UPDATE rover SET xcoord = "+x+", ycoord = "+y+" WHERE id = 1", function(error) {
        if(!!error){
        console.log(error);
        }
        else{
        console.log("position set, x=",x,"y=",y);
        }
    });
    y+=1;
    x+=1;
    //this code runs every second 
}, 1000);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
    