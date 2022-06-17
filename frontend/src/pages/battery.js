//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import axios from 'axios';
import './battery.css';

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
    var batteryLevel = 'unknown';
    var battery = 80
    switch(Math.ceil(battery/10)*10) {
      case 0:
          batteryLevel = 'zero';
          break
      case 10:
          batteryLevel = 'ten';
          break
      case 20:
          batteryLevel = 'twenty';
          break
      case 30:
          batteryLevel = 'thirty';
          break
      case 40:
          batteryLevel = 'fourty';
          break
      case 50:
          batteryLevel = 'fifty';
          break
      case 60:
          batteryLevel = 'sixty';
          break
      case 70:
          batteryLevel = 'seventy';
          break
      case 80:
          batteryLevel = 'eighty';
          break
      case 90:
          batteryLevel = 'ninety';
          break
      case 100:
          batteryLevel = 'hundred';
          break
      default:
          batteryLevel = 'unknown';
  }
    return (
 /*      <div className="div1">
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
 */
         <>
 
            <h1 className="header1">Battery</h1>
            <nav className='batteryform'>
                <div className='battery-container'>
                    <div className='status'>
                        <div className='statusinfo'>
                            <div className={`battery ${batteryLevel}`}></div>
                            <div className='batteryValue'>
                                Battery: {battery}%
                                <br/>
                                <br/>
                                <p>If the battery is less than 20%, the rover needs to be charged!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
  }
  
  export default Battery;