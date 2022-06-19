import React from 'react'
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
                {/*  <Star x={pos[0]} y={pos[1]} fill="red" numPoints={5} innerRadius={10} outerRadius={20}  */ }
                {obstacle} 
            </Layer>
        </Stage>



    )

}

export default Map; 
/*
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