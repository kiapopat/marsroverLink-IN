//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import axios from 'axios';

function Battery() {

    const [RoverData, setRoverData] = React.useState(null);
    //var xcoord;
    //var ycoord;
    var battery;
    //var lastUpdate;
   // var angle;

    /*const coords = {
      x: 5,
      y: 9
    }

    axios.post("/coords", coords)
    .then((response) => {
      console.log(response);
      console.log("test");
    });*/

    /*function postCoords(x, y){
      const coords = {
          x: x,
          y: y
      }

      axios.post("/coords", coords)
      .then((response) => {
          console.log(response);
          console.log("test");
      });
    }

    postCoords(5, 3);*/

    //async function to get rover data
    const getRoverData = async () => {
      const response = await axios("/rover");
      setRoverData(response.data);
    };

    //useEffect hook to get rover data
    //the way its set up now, getRoverData gets executed by the hook each time the page is re-rendered,
    //but for example you could also use getObstacleData as an event that gets executed whenever a button is clicked,
    //shouldn't be necesary
    React.useEffect(() => {
      getRoverData();
    }, [])


    //this is necessary because RoverData is null for some reason during the first two requests,
    //and the code breaks if I try to get attributes of a null object
    if(RoverData != null){
      battery = (RoverData.battery);
      //xcoord = (RoverData.xcoord);
      //ycoord = (RoverData.ycoord);
      //angle = (RoverData.angle);
      //lastUpdate = (RoverData.latest);
    }
  
    return (
      <div className="div1">
            <h1 className="header1">Battery</h1>
            
            
            <div className="content">
            <p className="text">
                
                <p>The battery of the rover is: {!battery ? "Loading..." : battery}</p>

                <br/>
                <p>If the battery is less than 20%, the rover needs to be charged!</p>
                <br/>
                <br/>    
            </p>
            </div>
      

        </div>
    );
  }
  
  export default Battery;