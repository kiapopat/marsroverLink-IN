import React, { useEffect } from 'react'
//import GridSquare from './gridsquare'
import axios from 'axios';
import { Stage, Layer, Rect, Text, Circle, Image} from 'react-konva';
import Konva from 'konva';
import roverpic from "./rover.png";
import useImage from 'use-image';
//import NameForm from "./components/input"


export default function Map(props) {
  

    const [RoverData, setRoverData] = React.useState(null);

    const getRoverData = async () => {
        const response = await axios("/rover");
        setRoverData(response.data);
      };

      React.useEffect(() => { //query backend for rover data every 200ms
        setInterval(function(){
            getRoverData();
        }, 200)
      }, [])
      
      if(RoverData != null){ //Rover positon display, currently displyed as green tile, please add rover icon
        var xrover = RoverData.xcoord;
        var yrover = RoverData.ycoord;
      }
      console.log(xrover, yrover);

      
    const [ObstacleData, setObstacleData] = React.useState(null);
    const getObstacleData = async () => {
        const response = await axios("/obstacles");
        setObstacleData(response.data);
      };

      React.useEffect(() => { //query database for obstacle data every second
        setInterval(function(){
            getObstacleData();
        }, 1000)
      }, [])

      var xrover = 0;
      var yrover = 0;
      var xvalues = [0,0,0,0,0,0];
      var yvalues = [0,0,0,0,0,0];
      var rvalues = [0,0,0,0,0,0];
      var colour = ["white","white","white","white","white","white","white",];
      //var x1, x2, x3, x4, x5, x6 = 0;
      //var y1, y2, y3, y4, y5, y6 = 0;
      //var r1, r2, r3, r4, r5, r6 = 0;
      //var colour1, colour2, colour3, colour4, colour5, colour6 = "white";



      //console.log(ObstacleData);

      if(ObstacleData != null){// For each key, colour in that square.
            for(let i=0; i<ObstacleData.length; i++){
                if(ObstacleData[i].x !== 0 || ObstacleData[i].y !== 0){
                    xvalues[i] = ObstacleData[i].x;
                    yvalues[i] = ObstacleData[i].y;
                    rvalues[i] = 20;
                    colour[i] = ObstacleData[i].colour;
                }
            }
      }

      const [image] = useImage(roverpic);

        
    return (


         <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
        

        <Circle x={xvalues[0]} 
                y={yvalues[0]} 
                radius={rvalues[0]}
                fill={colour[0]}
            />
        <Circle x={xvalues[1]} 
                y={yvalues[1]} 
                radius={rvalues[1]}
                fill={colour[1]}
            />
        <Circle x={xvalues[2]} 
                y={yvalues[2]} 
                radius={rvalues[2]}
                fill={colour[2]}
            />
        <Circle x={xvalues[3]} 
                y={yvalues[3]} 
                radius={rvalues[3]}
                fill={colour[3]}
            />
        <Circle x={xvalues[4]} 
                y={yvalues[4]} 
                radius={rvalues[4]}
                fill={colour[4]}
            />
        <Circle x={xvalues[5]} 
                y={yvalues[5]} 
                radius={rvalues[5]}
                fill={colour[5]}
            />
        


        <Image 
            image ={image}
            x = {xrover}
            y = {yrover}
            width = {50}
            height = {50}  
        />

        

        </Layer>
      </Stage>
    )
}


/* import React from 'react'
import Obstacles from './Obstacles';
import './gridmap.css'
import GridMap from './gridmap'
import {Stage, Layer, Text, RegularPolygon, Star} from 'react-konva';

 var stageX = 0;
var stageY = 0;
var stageWidth = window.innerWidth;
var stageHeight = window.innerHeight*3/4;

function Map({roverPath, pos, obstacle, stage}) {
    var roverWidth = 25;
    var basePos = [window.innerWidth/2 - roverWidth/2, window.innerHeight/2];
    // if(pos[0] < -stageX) {
    //     stageX = stageX - pos[0] + 100;
    //     stageWidth = stageWidth - pos[0] + 100;
    // } else if(pos[0] > stageWidth + stageX) {
    //     stageWidth = pos[0] + 100;
    // }
    // if(pos[1] < -stageY) {
    //     stageY = stageY - pos[1] + 100;
    //     stageHeight = stageHeight - pos[1] + 100;
    // } else if(pos[1] > stageHeight + stageY) {
    //     stageHeight = pos[1] + 100;
    // }
    // console.log(stage);
    return (
        
        <Stage x={stageX} y={stageY} width={stageWidth} height={stageHeight}>
            <Layer>
                {roverPath}
                <Text x={40} y={20} text="Star: the current location of the rover" fontSize={18} />
                <Text x={40} y={40} text="Triangle: the base" fontSize={18} />
                <Text x={40} y={60} text="Green Line: Rover Path" fontSize={18} />
                <Text x={40} y={80} text="Red -> White Fill: Indicate radar readings" fontSize={18} />
                <RegularPolygon sides={3} x={basePos[0]} y={basePos[1]} fill="blue" radius={20}/>
                {/*  <Star x={pos[0]} y={pos[1]} fill="red" numPoints={5} innerRadius={10} outerRadius={20}  }
                {obstacle} 
            </Layer>
        </Stage>



    )

}

export default Map; 

function Map() {
    return (
        <div
        style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100'
            }}
        >
        
            <h1>Map</h1>
            <Obstacles />
            
           
        </div>
    )
         var line = new Konva.Line({
            x: 100,
            y: 50,
            points: [73, 70, 340, 23, 450, 60, 500, 20],
            stroke: 'red',
            tension: 1
        });  
    
}

export default Map; 

*/
    
