import React, { useEffect } from 'react'
import GridSquare from './gridsquare'
import "./gridboard.css"
import axios from 'axios';

export default function GridBoard(props) {
    const GRID_SIZE = 20;
    const DEFAULT_COLOUR = 'white';
    const COLOUR_MAP = {
        pink: 1,
        green: 2, 
        black: 3,
        orange: 4,
        blue: 5,
        r1: 10,
        r2: 9,
        r3: 8,
        r4: 7,
        r5: 6,

    }

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


    const [colourGridData, setColourGridData] = React.useState([]);

        useEffect(()=>{
            // Create blank grid with all white squares
            const grid = [];

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
        }

            setColourGridData(grid);
        }, [RoverData]) //the grid is re-rendered every time RoverData is updated, so every 200ms

        
    return (
        <div className='grid-board'>
            {colourGridData}
        </div>
    )
}