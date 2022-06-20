import React from 'react';
//import pink from './Obstacles';
import axios from 'axios';
import './gridmap.css'
import { Component } from 'react';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next';
import GridBoard from './components/gridboard'
import { render } from '@testing-library/react';

function Gridmap(){

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
      pink =  (ObstacleData.pink);
      black = (ObstacleData.black);
      blue = (ObstacleData.blue);
      orange = (ObstacleData.orange);
      green = (ObstacleData.green);
    }
  

      
 return (



<div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}}>
     <GridBoard/>
</div>

/* <div style={{
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
}}>
    <p>pink: {!pink ? "Loading..." : pink}</p>
     <p>green: {!green ? "Loading..." : green}</p>
      <p>black: {!black ? "Loading..." : black}</p>
      <p>orange: {!orange ? "Loading..." : orange}</p>
      <p>blue: {!blue ? "Loading..." : blue}</p>  */

      
/*         style={{
        position: 'absolute',
        margin: 50px,
        margin-left: 400px,
        margin-top: 100px;  
      }};

    </div> */
); 

}

export default Gridmap;