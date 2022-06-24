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
    var point;
    let inRange = rangeCheck(dest, pos, obstacles, radius);
    if(inRange.length < 1){
        return dest;
    }
    //console.log("pos:",pos, "obstacles:", obstacles);
    function reachable(dest, pos, obstacles, direction){ //determines which obstacles can be reached directly from the current position
        let points = [];
        for(let i=0; i<obstacles.length; i++){
            let point = evade(dest, pos, obstacles[i], radius, direction);
            let inRange = rangeCheck(point, pos, obstacles, radius);
            let index = inRange.indexOf(i);
            //console.log("before:", inRange, "index:", index, "i:", i);
            if(index != -1){
                inRange.splice(index, 1);
            }
            //console.log("inrange:", inRange, "point:", point);
            if(inRange.length < 1){
                points.push(point);
            }
        }
        return points;
    }
    //console.log(reachable(dest, pos, obstacles, "left"));
    //console.log(reachable(dest, pos, obstacles, "right"));
    var min = 100000000000;
    var mindist = 10000000000;
    var possible_destinations = reachable(dest, pos, obstacles, "right"); //possible obstacles to go to if evading on right
    console.log("reachable right:", possible_destinations, "postion:", pos);
    for(let i=0; i<possible_destinations.length; i++){
        let inRange = rangeCheck(dest, possible_destinations[i], obstacles, radius);
        //console.log("point", possible_destinations[i], "reachable", inRange);
        pathdist = math.sqrt(math.pow(possible_destinations[i].x - dest.x,2) + math.pow(possible_destinations[i].y - dest.y, 2)) + math.sqrt(math.pow(possible_destinations[i].x - pos.x,2) + math.pow(possible_destinations[i].y - pos.y, 2));
        //console.log(inRange.length, possible_destinations[i]);
        if(inRange.length < min){
            min = inRange.length;
            point = possible_destinations[i]; //select point which has the least number of obstacles between it and the destination
            mindist = pathdist;
        }
        else if(inRange.length === min && pathdist < mindist){ //if two points have the same number of obstacles between them and the destination, select shorter path
            point = possible_destinations[i];
            mindist = pathdist;
        }
    }
    var possible_destinations = reachable(dest, pos, obstacles, "left"); //possible obstacles to go to if evading on right
    console.log("reachable left:", possible_destinations, "postion:", pos);
    for(let i=0; i<possible_destinations.length; i++){ //repeat process for evading on left
        let inRange = rangeCheck(dest, possible_destinations[i], obstacles, radius);
        //console.log("point", possible_destinations[i], "reachable", inRange);
        pathdist = math.sqrt(math.pow(possible_destinations[i].x - dest.x,2) + math.pow(possible_destinations[i].y - dest.y, 2)) + math.sqrt(math.pow(possible_destinations[i].x - pos.x,2) + math.pow(possible_destinations[i].y - pos.y, 2));
        if(inRange.length < min){
            min = inRange.length;
            point = possible_destinations[i];
            mindist = pathdist;
        }
        else if(inRange.length === min && pathdist < mindist){
            point = possible_destinations[i];
            mindist = pathdist;
        }
    }
    return point;   
}


function rangeCheck(dest, pos, obstacles, radius){ //checks which obstacles are obstructing path between position and destination, returns indices of obstacles

    inTheWay = [];
    var slope = (dest.y-pos.y)/(dest.x-pos.x); //slope between position and destination
    var ang_obs_pos = math.atan(slope); // ang_obs_pos between position and destination
    var q = pos.y - slope*pos.x; // y offset of line between position and destination
    var yoffset = radius/math.cos(ang_obs_pos); 
    //console.log(slope, q, yoffset);// y offset to add clearance on either side of the line between position and destination
    var distance_pos_dest = math.sqrt(math.pow(pos.x - dest.x,2) + math.pow(pos.y - dest.y, 2)); //distance between position and destination
    for(i=0; i<obstacles.length; i++){
        var distance_obs_dest = math.sqrt(math.pow(obstacles[i].x - dest.x,2) + math.pow(obstacles[i].y - dest.y, 2));
        var obs_pos = math.sqrt(math.pow(obstacles[i].x - pos.x,2) + math.pow(obstacles[i].y - pos.y, 2));
        if (distance_pos_dest > distance_obs_dest && distance_pos_dest > obs_pos){//excludes obstacles that are not between position and destination        
            //console.log("obstacle:", obstacles[i], "slope=", slope, "q=",q, " ang_obs_pos=", ang_obs_pos, " y offset=", radius/math.cos(ang_obs_pos), "obstacle y=", slope*obstacles[i].x);
            if(obstacles[i].y > (slope*obstacles[i].x + q - yoffset) && obstacles[i].y < (slope*obstacles[i].x + q + yoffset)){
                inTheWay.push(i); //if the obstacles is within the clearance area, push its index to the array
            }
        }
    }
    //console.log("in the way", inTheWay);
    return(inTheWay);
}

function evade(dest, pos, obstacle, radius, direction){

    function ang(obsx, obsy, posx, posy){
        let slope = (obsy-posy)/(obsx-posx);
        let angle = math.atan(slope);
        return angle;
    }
    var ang_obs_pos = ang(obstacle.x, obstacle.y, pos.x, pos.y); // angle from position to obstacle

    var distance_dest_obs = math.pow((math.pow((dest.x-obstacle.x),2)+math.pow((dest.y-obstacle.y),2)),0.5);
    var distance_dest_pos = math.pow((math.pow((dest.x-pos.x),2)+math.pow((dest.y-pos.y),2)),0.5);
    var ang_dest_pos = ang(dest.x, dest.y, pos.x, pos.y); //angle from position to destination
    
    if(ang_dest_pos < 0 && ang_obs_pos > 0){ //if destination left of position and obstacle is right of position
        ang_dest_pos = math.PI + ang_dest_pos; //adjust destination angle to correct value
    }
    if(ang_dest_pos > 0 && ang_obs_pos < 0){ //if destination right of position and obstacle is left of position
        ang_obs_pos = math.PI + ang_dest_pos; //adjust obstacle angle to correct value
    }
    if(ang_dest_pos > ang_obs_pos){
        var right_of_path = true; //obstacle right of path from position to destination
        //console.log("rightof");
    }
    if(ang_dest_pos < ang_obs_pos){
        var left_of_path = true; //obstacle left of path from position to destination
        //console.log("leftof");
    }
    
    ang_obs_pos = ang(obstacle.x, obstacle.y, pos.x, pos.y); //reset to original
    var deviation = math.PI - math.abs(math.asin((distance_dest_pos*math.sin(ang_dest_pos-ang_obs_pos))/distance_dest_obs)); //angle between path from obstacle to position and path from obstacle to destination
    //fix deviation for angles < 90 deg
    if(left_of_path){
        var evadeangle = (2*math.PI-deviation)/2 + ang(dest.x, dest.y, obstacle.x, obstacle.y); //angle of line on which to evade obstacle
    }
    else{
        var evadeangle = deviation/2 + ang(dest.x, dest.y, obstacle.x, obstacle.y); //angle of line on which to evade obstacle
    }
    //console.log("currently evading:", obstacle, " obsangle=", (ang_obs_pos/math.PI)*180, " destangle=", (ang_dest_pos/math.PI)*180, "deviation=", (deviation/math.PI)*180, " evadeangle=", (evadeangle/math.PI)*180);
    if(direction === "left"){
        var go_right = false;
    }
    if(direction === "right"){
        var go_right = true;
    }

    if(go_right){ //offsets in order to evade on right
        var y_offset = -math.sin(math.PI - evadeangle)*radius*1.5;
        var x_offset = math.cos(math.PI - evadeangle)*radius*1.5;
        //console.log("test", x_offset, y_offset);
    }
    else if(!go_right){ //offsets in order to evade on left
        var y_offset = math.sin(math.PI - evadeangle)*radius*1.5;
        var x_offset = -math.cos(math.PI - evadeangle)*radius*1.5;
        //console.log("test",x_offset, y_offset);
    }

    if( dest.x < obstacle.x){ //if destination left of obstacle
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
    /*{x:25, y:25},
    {x:32, y:32},
    {x:35, y:40},
    {x:60, y:60},
    {x:15, y:15}*/
    {x:20, y:10},
    {x:10, y:20},
    {x:24, y:44},
    {x:40, y:30},
    {x:38, y:50}
];

var obstacle = {
    x:60,
    y:50
};

var pos = {
    x:29.611,
    y:-1.52
};

//rangeCheck(dest, pos, obstacles, 10);
//console.time();
out = pathGenerator(dest, pos, obstacles);
console.log(out);
//console.timeEnd();
//point = evade(dest, pos, obstacle, obstacles, 10, "right");
//console.log(point);
//out = rangeCheck(dest, pos, obstacles, 10);
//console.log(out);