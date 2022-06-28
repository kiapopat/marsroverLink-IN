import React from 'react';
import axios from 'axios';
import GridBoard from './components/gridboard'

function Gridmap(){

    const [ObstacleData, setObstacleData] = React.useState(null);
    var pink;
    var blue;
    var green;
    var black;
    var orange;
    var yellow;

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
      yellow = (ObstacleData.yellow)
    }
  

      
 return (


<div style={{
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
    height:'100vh',
    padding:'10em'
    
 }}>



      <GridBoard/>
 </div>

); 

}

export default Gridmap;