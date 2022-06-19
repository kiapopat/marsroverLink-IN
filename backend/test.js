const express = require("express");

const mysql = require("mysql");

const async = require("async");


const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());

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

var pos = {
    x:null,
    y:null
};

var dest = {
    x:null,
    y:null
};

var obstacles = [];

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




connection.query("SELECT * FROM rover", getpos = function(error, rows, fields) {	
        
    if(!!error){
        console.log(error);
    }
    else{
        pos.x = rows[0].xcoord;
        pos.y = rows[0].ycoord;
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
                        console.log("position=", pos, " obstacles", obstacles);	
                    }
            }	
        });
    }
});



/*var pos = {
    x:null,
    y:null
};

var dest = {
    x:null,
    y:null
};

var obstacles = [];


const getRover = async () => {
    const response = await connection.query("SELECT * FROM rover", function(error, rows, fields) {	
        
        if(!!error){
            console.log(error);
        }
        else{
            pos.x = rows[0].xcoord;
            pos.y = rows[0].ycoord;
            return pos;
            console.log(pos);
        }  
    });
    return response;
}

(async () => {
    console.log("hello", await getRover());
  })()


/*connection.query("SELECT * FROM rover", function(error, rows, fields) {	
        
    if(!!error){
        console.log(error);
    }
    else{
        pos.x = rows[0].xcoord;
        pos.y = rows[0].ycoord;
        return callback(null, pos);
    }
    console.log(pos);
});*/

/*populate_user = function(user,_callback){
    async.paralell({
        profile: function(callback){
            var sql = "SELECT * FROM profiles WHERE user_id = " + user.id + " LIMIT 1 ";
            connection.query(sql,function(err,rows,fields){
                if(err)return callback(err);
                if(rows.length === 1)return callback(null,rows[0]);
                return callback(null,[]);
            });
        },

    function(err,result){
        if(err)return _callback(err);
        for(var att in result){user[att] = result[att];}
        callback(null,user);
    }
}*/



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

  //console.log(inTheWay);

        //var y_clear;
        //if(obstacles[i].x > xrange.min-radius && obstacles[i].x < xrange.max+radius &&obstacles[i]>){

    
          /*if(xrange.min === 0 && xrange.max === 0){ //if dest on x axis
            y_val = obstacles[i].y;
          }
          else{
            if(xrange.max > 0){ //differentiates between destination on right or left of origin (assumption rover starts at origin)
              if(yrange.max > 0){ // differentiates between destination above or below origin (same assumption ^^)
                y_val = yrange.min + (obstacles[i].x - xrange.min)*math.tan(angle); //top right quadrant
                console.log("topright y_val=",y_val," y=", obstacles[i].y);
                console.log(yrange.min);
              }
              else{ //bottom right quadrant
                y_val = yrange.min - (obstacles[i].x - xrange.min)*math.tan(angle);
                console.log("y_val=",y_val," y=", obstacles[i].y);
              }
            }
            else{ // addresses destinations on left of origin
              if(yrange.max > 0){ //top left quadrant
                y_val = yrange.min + (math.abs(obstacles[i].x - xrange.max))*math.tan(angle);
                console.log("y_val=",y_val," y=", obstacles[i].y);
              }
              else{ //bottom left quadrant
                y_val = yrange.max - (math.abs(obstacles[i].x - xrange.max))*math.tan(angle);
                console.log("bottomleft y_val=",y_val," y=", obstacles[i].y);
              }
            }
          }
          //std::cout << y_val << "," << i << std::endl;
          if((xrange.min === 0 && xrange.max === 0) || ((obstacles[i].x === yrange.max || obstacles[i].y === yrange.min) && (xrange.min === 0 || xrange.max === 0)) || ((obstacles[i].x === xrange.max || obstacles[i].x === xrange.min) && (yrange.min === 0 || yrange.max === 0))){ //radius when dest is on one of axes
            y_clear = 10;
          }
          else{
            y_clear = (radius/math.cos(angle));
          }
          //std::cout << y_clear << std::endl;
          if(obstacles[i].x > y_val-y_clear && obstacles[i].y < y_val+y_clear){
            inTheWay.push(i);
          }
        }
        //std::cout<< obsInTheWay.length << std::endl;*/
    //console.log(inTheWay);


/*if(obstacle.x-pos.x > 0 && obstacle.y-pos.y < 0 || obstacle.x-pos.x < 0 && obstacle.y-pos.y > 0){//1st and 4th quadrant
        for(i=0; i<obstacles.length; i++){
            if(angle(obstacle[i], pos) < angle){
                rightOf.push(obstacle[i]);
            }
            else if (angle(obstacle[i], pos) > angle){
                leftOf.push(obstacle[i]);
            }
        }
    }*/



/*function evade(obstacle, xrange, yrange, radius){
    var angle = math.atan2(yrange.max-yrange.min, xrange.max-xrange.min);
    var newDest = {x:null, y:null};
    if(xrange.min === 0 && xrange.max === 0){ //if dest is on y axis
    var xpos = 0;
    newDest.y = obstacle.y;
    if(obstacle.x < xpos){ //if on left of y axis
      newDest.x = obstacle.x + radius;
    }
    else{ //if on right of y axis
      newDest.x = obstacle.x - radius;
    }
  }
  else if(yrange.min === 0 && yrange.max === 0){ //if dest is on x axis
    newDest.x = obstacle.x;
    if(obstacle.y < 0){ //below x axis
      newDest.y = obstacle.y + radius;
    }
    else{
      newDest.y = obstacle.y - radius;
    }
  }
  else{
    if(yrange.max > 0){ //differentiates between destinations above and below origin
      if(xrange.max > 0){ // differentiates between destinations left or right of origin (top right quadrant here)
        var xpos = xrange.min + (obstacle.y - yrange.min)/math.tan(angle);
        if(obstacle.x < xpos){ //if obstacle is left of path
          newDest.x = xpos + radius*(angle/(math.PI/2));
          if(newDest.x - obstacle.x > radius){ // if distance in x coordinates is more than 100 just adjust y coordinate by 100
            newDest.y = obstacle.y - radius;
          }
          else{ // if x radius is less than 100, ensure y distance is enough so that closest rover travels is 100 using pythagoras
            var y = math.sqrt(math.pow(radius,2) - math.pow((xpos - obstacle.x),2));
            newDest.y = obstacle.y - y;
          }
        }
        else{ //if obstacle is right of path
          newDest.x = xpos - radius*(angle/(math.PI/2));
          if(obstacle.x - newDest.x > radius){
            newDest.y = obstacle.y + radius;
          }
          else{
            var y = math.sqrt(math.pow(radius,2) - math.pow((obstacle.x - xpos),2));
            newDest.y = obstacle.y + y;
          }
        }
      }
        else{ //top left quadrant here
          var xpos = xrange.max - (obstacle.y - yrange.min)/math.tan(angle);
          if(obstacle.x < xpos){ //obstacle on left of path
            newDest.x = xpos + radius*(angle/(math.PI/2));
            if(newDest.x - obstacle.x > radius){
              newDest.y = obstacle.y + radius;
            }
            else{
              var y = math.sqrt(math.pow(radius,2) - math.pow((xpos - obstacle.x),2));
              newDest.y = obstacle.y + y;
            }
          }
          else{ //obstacle on right of path
            newDest.x = xpos - radius*(angle/(math.PI/2));
            if(obstacle.x - newDest.x > radius){
              newDest.y = obstacle.y - radius;
            }
            else{
              var y = math.sqrt(math.pow(radius,2) - math.pow((obstacle.x - xpos),2));
              newDest.y = obstacle.y - y;
            }
          }
        }
      }
      else{ // destinations below origin addressed here
        if(xrange.max > 0){ // bottom right quadrant here
          var xpos = xrange.min + math.abs((obstacle.y - yrange.max))/math.tan(angle);
          if(obstacle.x < xpos){ //obstacle on right of path
            newDest.x = xpos + radius*(angle/(math.PI/2));
            if(newDest.x - obstacle.x > radius){
              newDest.y = obstacle.y + radius;
            }
            else{
              var y = math.sqrt(math.pow(radius,2) - math.pow((xpos - obstacle.x),2));
              newDest.y = obstacle.y + y;
            }
          }
          else{ //obstacle on left of path
            newDest.x = xpos - radius*(angle/(math.PI/2));
            if(obstacle.x - newDest.x > radius){
              newDest.y = obstacle.y - radius;
            }
            else{
              var y = math.sqrt(math.pow(radius,2) - math.pow((obstacle.x - xpos),2));
              newDest.y = obstacle.y - y;
            }
          }
        }
        else{ //bottom left quadrant here
          var xpos = xrange.max - math.abs((obstacle.y - yrange.max))/math.tan(angle);
            if(obstacle.x < xpos){ //obstacle on right of path
              newDest.x = xpos + radius*(angle/(math.PI/2));
              if(newDest.x - obstacle.x > radius){
                newDest.y = obstacle.y - radius;
              }
              else{
                var y = math.sqrt(math.pow(radius,2) - math.pow((xpos - obstacle.x),2));
                newDest.y = obstacle.y - y;
              }
            }
            else{ //obstacle on right of path
              newDest.x = xpos - radius*(angle/(math.PI/2));
              if(obstacle.x - newDest.x > radius){
                newDest.y = obstacle.y + radius;
              }
              else{
                var y = math.sqrt(math.pow(radius,2) - math.pow((obstacle.x - xpos),2));
                newDest.y = obstacle.y + y;
              }
            }
          }
      }
  }
  //std::cout << newDest.x << "," << newDest.y << std::endl;
  return newDest;

  /*inTheWay = [];
    var angle = math.atan2(yrange.max-yrange.min, xrange.max-xrange.min)
    for(i=0; i<obstacles.length; i++){
        var y_val;
        var y_clear;
        if(obstacles[i].x > xrange.min-radius && obstacles[i].x < xrange.max+radius){
    
          if(xrange.min === 0 && xrange.max === 0){ //if dest on x axis
            y_val = obstacles[i].y;
          }
          else{
            if(xrange.max > 0){ //differentiates between destination on right or left of origin (assumption rover starts at origin)
              if(yrange.max > 0){ // differentiates between destination above or below origin (same assumption ^^)
                y_val = yrange.min + (obstacles[i].x - xrange.min)*math.tan(angle); //top right quadrant
                console.log("topright y_val=",y_val," y=", obstacles[i].y);
                console.log(yrange.min);
              }
              else{ //bottom right quadrant
                y_val = yrange.min - (obstacles[i].x - xrange.min)*math.tan(angle);
                console.log("y_val=",y_val," y=", obstacles[i].y);
              }
            }
            else{ // addresses destinations on left of origin
              if(yrange.max > 0){ //top left quadrant
                y_val = yrange.min + (math.abs(obstacles[i].x - xrange.max))*math.tan(angle);
                console.log("y_val=",y_val," y=", obstacles[i].y);
              }
              else{ //bottom left quadrant
                y_val = yrange.max - (math.abs(obstacles[i].x - xrange.max))*math.tan(angle);
                console.log("bottomleft y_val=",y_val," y=", obstacles[i].y);
              }
            }
          }
          //std::cout << y_val << "," << i << std::endl;
          if((xrange.min === 0 && xrange.max === 0) || ((obstacles[i].x === yrange.max || obstacles[i].y === yrange.min) && (xrange.min === 0 || xrange.max === 0)) || ((obstacles[i].x === xrange.max || obstacles[i].x === xrange.min) && (yrange.min === 0 || yrange.max === 0))){ //radius when dest is on one of axes
            y_clear = 10;
          }
          else{
            y_clear = (radius/math.cos(angle));
          }
          //std::cout << y_clear << std::endl;
          if(obstacles[i].x > y_val-y_clear && obstacles[i].y < y_val+y_clear){
            inTheWay.push(i);
          }
        }
        //std::cout<< obsInTheWay.length << std::endl;
    }
    return(inTheWay);*/

    /*if(pos.x < dest.x){
        xrange.min = pos.x;
        xrange.max = dest.x;
    }
    else{
        xrange.min = dest.x;
        xrange.max = pos.x;
    }
    if(pos.y < dest.y){
        yrange.min = pos.y;
        yrange.max = dest.y;
    }
    else{
        yrange.min = dest.y;
        xrange.max = pos.y;
    }*/