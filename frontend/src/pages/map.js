import React, { useEffect } from 'react'
import axios from 'axios';
import { Stage, Layer, Rect, Text, Circle, Image} from 'react-konva';
import Konva from 'konva';
import roverpic from "./rover.png";
import useImage from 'use-image';
import './map.css'


export default function Map(props) {
    var xrover = 0;
    var yrover = 0;
    var scalefactor = 0.42;
    var offset = 100;
  

    const [RoverData, setRoverData] = React.useState(null);

    const getRoverData = async () => {
        const response = await axios("/rover");
        setRoverData(response.data);
      };

      React.useEffect(() => { //query backend for rover data every 200ms
        setInterval(function(){
            getRoverData();
        }, 20)
      }, [])
      //console.log("roverdata", RoverData);
      
      if(RoverData != null){ //Rover positon display, currently displyed as green tile, please add rover icon
        xrover = RoverData.xcoord;
        yrover = RoverData.ycoord;
      }
      //console.log(xrover, yrover);

      
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

      //var xrover = 0;
      //var yrover = 0;
      var xvalues = [0,0,0,0,0,0];
      var yvalues = [0,0,0,0,0,0];
      var rvalues = [0,0,0,0,0,0];
      var fontsize = [0,0,0,0,0,0];
      var colour = ["white","white","white","white","white","white","white",];
      //var x1, x2, x3, x4, x5, x6 = 0;
      //var y1, y2, y3, y4, y5, y6 = 0;
      //var r1, r2, r3, r4, r5, r6 = 0;
      //var colour1, colour2, colour3, colour4, colour5, colour6 = "white";




       if(ObstacleData != null){// For each key, colour in that square.
            for(let i=0; i<ObstacleData.length; i++){
                if(ObstacleData[i].x !== 0 || ObstacleData[i].y !== 0){
                    xvalues[i] = ObstacleData[i].x;
                    yvalues[i] = ObstacleData[i].y;
                    rvalues[i] = 10;
                    colour[i] = ObstacleData[i].colour;
                    fontsize[i] = 18;
                }
            }
      }

      const [image] = useImage(roverpic);

        
    return (


         <Stage width={1500} height={890}>
        <Layer>
        

        <Circle x={xvalues[0]*scalefactor+offset} 
                y={yvalues[0]*scalefactor+offset} 
                radius={rvalues[0]}
                fill={colour[0]}
            />
        <Circle x={xvalues[1]*scalefactor+offset} 
                y={yvalues[1]*scalefactor+offset} 
                radius={rvalues[1]}
                fill={colour[1]}
            />
        <Circle x={xvalues[2]*scalefactor+offset} 
                y={yvalues[2]*scalefactor+offset} 
                radius={rvalues[2]}
                fill={colour[2]}
            />
        <Circle x={xvalues[3]*scalefactor+offset} 
                y={yvalues[3]*scalefactor+offset} 
                radius={rvalues[3]}
                fill={colour[3]}
            />
        <Circle x={xvalues[4]*scalefactor+offset} 
                y={yvalues[4]*scalefactor+offset} 
                radius={rvalues[4]}
                fill={colour[4]}
            />
        <Circle x={xvalues[5]*scalefactor+offset} 
                y={yvalues[5]*scalefactor+offset} 
                radius={rvalues[5]}
                fill={colour[5]}
            />
        


        <Image 
            image ={image}
            x = {xrover*scalefactor+offset}
            y = {yrover*scalefactor+offset}
            width = {50}
            height = {50}  
        />


 <Text x={1000} y={20} text={colour[0] + " alien: " + xvalues[0] + "," + yvalues[0]}  fontSize={fontsize[0]} /> 
 <Text x={1000} y={40} text={colour[1] + " alien: " + xvalues[1] + "," + yvalues[1]}  fontSize={fontsize[1]}/>
 <Text x={1000} y={60} text={colour[2] + " alien: " + xvalues[2] + "," + yvalues[2]}  fontSize={fontsize[2]}/>
 <Text x={1000} y={80} text={colour[3] + " alien: " + xvalues[3] + "," + yvalues[3]}  fontSize={fontsize[3]}/>
 <Text x={1000} y={100} text={colour[4] + " alien: " + xvalues[4] + "," + yvalues[4]}  fontSize={fontsize[4]}/>
 <Text x={1000} y={120} text={colour[5] + " alien: " + xvalues[5] + "," + yvalues[5]}  fontSize={fontsize[5]}/>


        </Layer>
      </Stage>
    )
}