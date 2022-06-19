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
    }

    const [colourGridData, setColourGridData] = React.useState([]);

        useEffect(()=>{
            const sampleData = {pink: [1, 2], blue: [1, 3], orange: [17, 6], black: [10, 10], green: [12, 19]};
            // Create blank grid with all white squares
            const grid = [];
            for(let i = 0; i < GRID_SIZE; i++) {
                grid.push([]);
                for(let j = 0; j < GRID_SIZE; j++) {
                    grid[i].push(<GridSquare key={(i,j)} color={COLOUR_MAP[DEFAULT_COLOUR]} />);
                }
            }

            // For each key, colour in that square. 
            for(const colour in sampleData) {
                var coords = sampleData[colour];
                const x = coords[0];
                const y = coords[1];
                grid[x][y] = <GridSquare key={(x,y)} color={COLOUR_MAP[colour]} />; 
            }

            setColourGridData(grid);
        }, [])

        
    return (
        <div className='grid-board'>
            {colourGridData}
        </div>
    )
}