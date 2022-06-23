/* import React from 'react'
import GridSquare from './gridsquare'
import "./gridboard.css"
import { color } from '@mui/system'
import axios from 'axios';

export default function GridBoard(props) {

    const [ObstacleData, setObstacleData] = React.useState(null);
    var pink;
    var blue;
    var green;
    var black;
    var orange;

    //async function to get obstacle data
    const getObstacleData = async () => {
      const response = await axios("/obstacles");
      setObstacleData(response.data);
    };

    //useEffect hook to get obstacle data
    //the way its set up now, getObstacleData gets executed by the hook each time the page is re-rendered,
    //but for example you could also use getObstacleData as an event that gets executed whenever a button is clicked,
    //shouldn't be necesary
    React.useEffect(() => {
      getObstacleData();
    }, [])

 
    //this is necessary because ObstacleData is null for some reason during the first two requests,
    //and the code breaks if I try to get attributes of a null object
    //note that the elements pink, black etc. are arrays with two values, namely the x and y coordinate values of the obstacle
    if(ObstacleData != null){
      pink = (ObstacleData.pink);
      black = (ObstacleData.black);
      blue = (ObstacleData.blue);
      orange = (ObstacleData.orange);
      green = (ObstacleData.green);
    }

// Represents a 20 x 2o grid of grid squares



  // generates an array of 20 rows, each containing 20 GridSquares.

    const grid = []
    for (let row = 0; row < 20; row ++) {
        grid.push([])
        for (let col = 0; col < 20; col ++) {
            var radarval = /* take from backend 'unknown';
    //var battery = 100

            
    switch(radarval) {
      case 1:
          color = '10';
          break
      case 2:
          color = '9';
          break
      case 3:
          color = '8';
          break
      case 4:
          color = '7';
          break
      case 5:
          color = '6';
          break
      
      default:
          color = '0';
  }

  if (col,row == ObstacleData.pink){
    color = '1'
}
else if (col,row == ObstacleData.green){
    color = '2'
}
else if (col,row == ObstacleData.black){
    color = '3'
}
else if (col,row == ObstacleData.orange){
    color = '4'
}
else if (col,row == ObstacleData.blue){
    color = '5'
}
            grid[row].push(<GridSquare key={`${col}${row}`} color="0" />)

        }


    }

  // The components generated in makeGrid are rendered in div.grid-board

    return (
        <div className='grid-board'>
            {grid}
        </div>
    )
} */

import React, { useEffect } from 'react'
//import GridSquare from './gridsquare'
//import "./gridboard.css"
import axios from 'axios';
import { Stage, Layer, Rect, Text, Circle, Image} from 'react-konva';
import Konva from 'konva';
import roverpic from "./rover.png";
import useImage from 'use-image';

export default function Map(props) {
    /*const GRID_SIZE = 20;
    const DEFAULT_COLOUR = 'white';
    const COLOUR_MAP = {
        pink: 1,
        green: 2, 
        black: 3,
        orange: 4,
        blue: 5,
    }

    */const [RoverData, setRoverData] = React.useState(null);

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
        //var xrover = RoverData.xcoord;
        //var yrover = RoverData.ycoord;
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

      var xrover = 250;
      var yrover = 250;
      var x1=100;
      var x2=50;
      var x3=200;
      var x4=300;
      //var x5=0;
      //var x6=0;
      var y1=400;
      var y2=70;
      var y3=300;
      var y4=200;
      //var y5=0;
      //var y6=0;
      var colour1 = "blue";
      var colour2 = "pink";
      var colour3 = "black";
      var colour4 = "green";
      //var colour5 = "white";
      //var colour6 = "white";
      //console.log(ObstacleData);

      /*if(ObstacleData != null){// For each key, colour in that square.
            if(ObstacleData.length > 0){
                x1 = ObstacleData[0].x;
                y1 = ObstacleData[0].y;
                colour1 = ObstacleData[0].colour; 
            }
        
            if(ObstacleData.length > 1){
                x2 = ObstacleData[1].x;
                y2 = ObstacleData[1].y;
                colour2 = ObstacleData[1].colour; 
            }       
        
            if(ObstacleData.length > 2){
                x3 = ObstacleData[2].x;
                y3 = ObstacleData[2].y;
                colour3 = ObstacleData[2].colour; 
            }
            if(ObstacleData.length > 3){
                x4 = ObstacleData[3].x;
                y4 = ObstacleData[3].y;
                colour4 = ObstacleData[3].colour; 
            }
            if(ObstacleData.length > 4){
                x5 = ObstacleData[4].x;
                y5 = ObstacleData[4].y;
                colour5 = ObstacleData[4].colour; 
            }
            if(ObstacleData.length > 5){
                x6 = ObstacleData[5].x;
                y6 = ObstacleData[5].y;
                colour6 = ObstacleData[5].colour; 
            }
      }*/

      const [image] = useImage(roverpic);


    //const [colourGridData, setColourGridData] = React.useState([]);

        //useEffect(()=>{
            // Create blank grid with all white squares
            /*const grid = [];

            for(let i = 0; i < GRID_SIZE; i++) {
                grid.push([]);
                for(let j = 0; j < GRID_SIZE; j++) {
                    grid[i].push(<GridSquare key={(i,j)} color={COLOUR_MAP[DEFAULT_COLOUR]} />);
                }
            }

            if(ObstacleData != null){// For each key, colour in that square.
            for(let i=0; i<ObstacleData.length; i++) {
                let x = ObstacleData[i].x;
                let y = ObstacleData[i].y;
                let colour = ObstacleData[i].colour;
                grid[x][y] = <GridSquare key={(x,y)} color={COLOUR_MAP[colour]} />; 
            }

            if(RoverData != null){ //Rover positon display, currently displyed as green tile, please add rover icon
                let x = RoverData.xcoord;
                let y = RoverData.ycoord;
                let colour = "green";
                grid[x][y] = <GridSquare key={(x,y)} color={COLOUR_MAP[colour]} />; 
                console.log("rover x=", x, "rover y",y);
            }
        }*/
        /*let stage = new Konva.Stage({
            height : 500,
            width: 500,
            container: "grid-board"
        });

        let layer = new Konva.Layer();
        stage.add(layer);

        
        if(ObstacleData != null){// For each key, colour in that square.
        for(let i=0; i<ObstacleData.length; i++) {
            let x = ObstacleData[i].x;
            let y = ObstacleData[i].y;
            let colour = ObstacleData[i].colour;
            let obstacle = new Konva.Rect({
                x: x,
                y: y,
                fill: colour
            })
            layer.add(obstacle);
            layer.draw();
        }

        if(RoverData != null){ //Rover positon display, currently displyed as green tile, please add rover icon
            let x = RoverData.xcoord;
            let y = RoverData.ycoord;
            let colour = "green";
            let rover = new Konva.Rect({
                x: x,
                y: y,
                fill: colour
            })
            layer.add(rover);
            layer.draw();
            console.log("rover x=", x, "rover y",y);
        }
    }
    <div className='grid-board'>
            {colourGridData}
        </div>
        <Circle x={xrover} 
                y={yrover} 
                radius={20}
                fill={'red'}
                stroke={'black'}
                strokeWidth={4}

            setColourGridData(stage);
        }, [RoverData])*/ //the grid is re-rendered every time RoverData is updated, so every 200ms

        
    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
        
        <Image 
            image ={image}
            x = {xrover}
            y = {yrover}
            width = {100}
            height = {100}  
        />

        <Circle x={x1} 
                y={y1} 
                radius={20}
                fill={colour1}
                //stroke={'black'}
                //strokeWidth={4}
            />
        
        <Circle x={x2} 
                y={y2} 
                radius={20}
                fill={colour2}
                //stroke={'black'}
                //strokeWidth={4}
            />

        <Circle x={x3} 
                y={y3} 
                radius={20}
                fill={colour3}
                //stroke={'black'}
                //strokeWidth={4}
            />
        
        <Circle x={x4} 
                y={y4} 
                radius={20}
                fill={colour4}
                //stroke={'black'}
                //strokeWidth={4}
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
/*          var line = new Konva.Line({
            x: 100,
            y: 50,
            points: [73, 70, 340, 23, 450, 60, 500, 20],
            stroke: 'red',
            tension: 1
        });  
    
}

export default Map; 
*/

 