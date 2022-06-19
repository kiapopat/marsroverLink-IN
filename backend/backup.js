const math = require("math");

module.exports = {pathGenerator}

function pathGenerator(dest, pos, obstacles){ //create new waypoints until destination is reached

    output = [];
    waypoint = createPath(dest, pos, obstacles);
    output.push(waypoint);
    while (waypoint != dest){
        waypoint = createPath(dest, waypoint, obstacles);
        output.push(waypoint);
    }
    return(output);
}

function createPath(dest, pos, obstacles){
    var radius = 10;
    /*var reachable_right = [];
    var reachable_left = [];

    var points_right = [];
    var points_left = [];
    console.log("pos:",pos, "obstacles:", obstacles);
    for(i=0; i<obstacles.length; i++){
        var go_right = true;
        //console.log("i:", i);
        let point = evade(dest, pos, obstacles[i], obstacles, radius, "left");
        points_left.push(point);
        //console.log("point right", point, "obstacle", obstacles[i]);
        //console.log(rangeCheck(point, pos, obstacles, radius));
        //console.log("test", inRange);
        //if(inRange.length ===1){
            //reachable_left.push(point);
        //}
    }
    console.log("left",points_left)
    console.log("test1", rangeCheck(points_left[0], pos, obstacles, radius));
    console.log("test2", rangeCheck(points_left[1], pos, obstacles, radius));

    for(i=0; i<obstacles.length; i++){
        //var go_right = false;
        let point = evade(dest, pos, obstacles[i], obstacles, radius, "right");
        points_right.push(point);
        //console.log("point left", point);
        //let inRange = rangeCheck(point, pos, obstacles, radius);
        //console.log("test", inRange);
        //if(inRange.length ===1){
            //reachable_right.push(point);
        //}
    }
    console.log("right",points_right);

    //console.log("reachable left", reachable_left);
    //console.log("reachable right", reachable_right);
    */
    //console.log("pos:",pos, "obstacles:", obstacles, "dest=", dest);
    var inRange = rangeCheck(dest, pos, obstacles, radius); // check which obstacles are obstructing the path from position to destination
    //console.log("test", inRange);
    //for(i=0; i<inRange.length; i++){
        //console.log("inrange", obstacles[inRange[i]]);
    //}
    //console.log("inrange", inRange);
    var minDist = 100000000000;
    var closest = null;
    for(i=0; i< inRange.length; i++){
        var dist = math.sqrt(math.pow(obstacles[inRange[i]].x - 0,2) + math.pow(obstacles[inRange[i]].y - 0, 2));
        if(dist < minDist){
            closest = inRange[i];
            //console.log(obstacles[closest]);
            minDist = dist;
          }
    }

    var point = {x:null, y:null};
    if(closest != null){
        point = evade(dest, pos, obstacles[closest], obstacles, radius); //avoid the closest obstacle
        obstacles.splice(closest,1); //remove obstacles that has been evaded
        //console.log("test", test);
    }
    else{
        point = dest;
    }
    //console.log("test", point);  
    return(point);     
}

function rangeCheck(dest, pos, obstacles, radius){ //checks which obstacles are obstructing path between position and destination, returns indices of obstacl

    inTheWay = [];
    var slope = (dest.y-pos.y)/(dest.x-pos.x);
    var angle = math.atan(slope);
    var q = pos.y - slope*pos.x;
    var yoffset = radius/math.cos(angle);
    var pos_dest = math.sqrt(math.pow(pos.x - dest.x,2) + math.pow(pos.y - dest.y, 2));
    for(i=0; i<obstacles.length; i++){
        var obs_dest = math.sqrt(math.pow(obstacles[i].x - dest.x,2) + math.pow(obstacles[i].y - dest.y, 2));
        var obs_pos = math.sqrt(math.pow(obstacles[i].x - pos.x,2) + math.pow(obstacles[i].y - pos.y, 2));
        //var y_offset = math.cos(angle)
        console.log()
        if (pos_dest > obs_dest && pos_dest > obs_pos){
            //console.log("obstacle:", obstacles[i], "slope=", slope, "q=",q, " angle=", angle, " y offset=", radius/math.cos(angle), "obstacle y=", slope*obstacles[i].x);
            if(obstacles[i].y > (slope*obstacles[i].x + q - yoffset) && obstacles[i].y < (slope*obstacles[i].x + q + yoffset)){
                inTheWay.push(i);
            }
        }
    }
    //console.log("in the way", inTheWay);
    return(inTheWay);
}

function evade(dest, pos, obstacle, obstacles, radius /*direction*/){
    //console.log("obstacle",obstacle);
    //console.log("currently evading:", obstacle);
    rightOf = [];
    leftOf = [];
    function ang(obsx, obsy, posx, posy){
        let slope = (obsy-posy)/(obsx-posx);
        let angle = math.atan(slope);
        return angle;
    }
    var angle = ang(obstacle.x, obstacle.y, pos.x, pos.y);
    //console.log("angle",angle);
 
   if(obstacle.x-pos.x > 0 && obstacle.y-pos.y > 0 || obstacle.x-pos.x < 0 && obstacle.y-pos.y < 0){//1st and 3rd quadrant
        for(i=0; i<obstacles.length; i++){
            if(ang(obstacles[i].x, obstacles[i].y, pos.x, pos.y) < angle){
                rightOf.push(obstacles[i]);
                //console.log("rightOf",rightOf);
            }
            else if (ang(obstacles[i].x, obstacles[i].y, pos.x, pos.y) > angle){
                leftOf.push(obstacles[i]);
                //console.log("leftOf",leftOf);
            }
        }
    }

    else if(obstacle.x-pos.x > 0 && obstacle.y-pos.y < 0 || obstacle.x-pos.x < 0 && obstacle.y-pos.y > 0){//2nd and 4th quadrant
        for(i=0; i<obstacles.length; i++){
            if(ang(obstacles[i].x, obstacles[i].y, pos.x, pos.y) < angle){
                leftOf.push(obstacles[i]);
                //console.log("rightOf",rightOf);
            }
            else if (ang(obstacles[i].x, obstacles[i].y, pos.x, pos.y) > angle){
                rightOf.push(obstacles[i]);
                //console.log("leftOf",leftOf);
            }
        }
    }
    //console.log(obstacle);
    var dest_obs = math.pow((math.pow((dest.x-obstacle.x),2)+math.pow((dest.y-obstacle.y),2)),0.5);
    var dest_pos = math.pow((math.pow((dest.x-pos.x),2)+math.pow((dest.y-pos.y),2)),0.5);
    var obsangle = ang(obstacle.x, obstacle.y, pos.x, pos.y);
    var destangle = ang(dest.x, dest.y, pos.x, pos.y);
    
    if(destangle < 0 && obsangle > 0){
        destangle = math.PI + destangle;
    }

    if(destangle > 0 && obsangle < 0){
        angle = math.PI + destangle;
    }

    if(destangle > angle){
        var right_of_path = true;
        console.log("rightof");
    }
    if(destangle < angle){
        var left_of_path = true;
        console.log("leftof");
    }
    var deviation = math.PI - math.abs(math.asin((dest_pos*math.sin(destangle-obsangle))/dest_obs));

    if(left_of_path){
        var evadeangle = (2*math.PI-deviation)/2 + ang(dest.x, dest.y, obstacle.x, obstacle.y);  
    }
    else{
        var evadeangle = deviation/2 + ang(dest.x, dest.y, obstacle.x, obstacle.y);
    }
    //var evadeangle = (2*math.PI-deviation)/2 + ang(dest.x, dest.y, obstacle.x, obstacle.y); 
    //console.log("evadeangle:", evadeangle);
    console.log("currently evading:", obstacle, " obsangle=", (obsangle/math.PI)*180, " destangle=", (destangle/math.PI)*180, "angle",(angle/math.PI)*180, "deviation=", (deviation/math.PI)*180, " evadeangle=", (evadeangle/math.PI)*180);
    /*if(direction === "left"){
        var go_right = false;
    }

    if(direction === "right"){
        var go_right = true;
    }*/
    var go_right = true;
    if(rightOf.length > leftOf.length){go_right = true;}
    else if (rightOf.length < leftOf.length){go_right = false;}
    else{
        if(left_of_path){go_right = true;}
        else if(right_of_path){go_left = true;}
    }

    if(go_right){
        var y_offset = -math.sin(math.PI - evadeangle)*radius;
        var x_offset = math.cos(math.PI - evadeangle)*radius;
        //console.log("test", x_offset, y_offset);
    }
    else if(!go_right){
        var y_offset = math.sin(math.PI - evadeangle)*radius;
        var x_offset = -math.cos(math.PI - evadeangle)*radius;
        //console.log("test",x_offset, y_offset);
    }

    if( obstacle.x < pos.x){
        x_offset = -x_offset;
        y_offset = -y_offset;
    }
    
    let point = {
        x: obstacle.x + x_offset,
        y: obstacle.y + y_offset
    };

    //console.log("currently evading:", obstacle, "point:", point);

    return point;
}

var dest = {
    x:50,
    y:50
};

var obstacles = [
    {x:25, y:25},
    {x:32, y:32},
    {x:35, y:40},
    {x:60, y:60},
    {x:70, y:30},
    {x:15, y:15}
];

var obstacle = {
    x:32, y:32
};

var pos = {
    x:33.88,
    y:20.403
};

/*function reachable(pos, obstacles, radius){
    var out = [];
    var points= [];
    for(i=0; i<obstacles.length; i++){
    let point = evade(dest, pos, obstacles[i], obstacles, radius);
    points.push(point);
    }

    if(points.length > 0){
        let num = rangeCheck(points[0], pos, obstacles, radius);
        if(num.length <= 1){
            out.push(points[0]);
        }
    }
    if(points.length > 1){
        let num = rangeCheck(points[1], pos, obstacles, radius);
        if(num.length <= 1){
            out.push(points[1]);
        }
    }
    if(points.length > 2){
        let num = rangeCheck(points[2], pos, obstacles, radius);
        if(num.length <= 1){
            out.push(points[2]);
        }
    }
    if(points.length > 3){
        let num = rangeCheck(points[3], pos, obstacles, radius);
        if(num.length <= 1){
            out.push(points[3]);
        }
    }
    if(points.length > 4){
        let num = rangeCheck(points[4], pos, obstacles, radius);
        if(num.length <= 1){
            out.push(points[4]);
        }
    }
    if(points.length > 5){
        let num = rangeCheck(points[5], pos, obstacles, radius);
        if(num.length <= 1){
            out.push(points[5]);
        }
    }
    return out;
}*/

//var point = evade(dest, pos, obstacle, obstacles, 10, true);
//console.log(point);
//createPath(dest, pos, obstacles);
//console.time();
var point =evade(dest, pos, obstacle, obstacles, 10);
console.log(point);
//output = pathGenerator(dest, pos, obstacles);
//console.timeEnd();
//console.log(output);
