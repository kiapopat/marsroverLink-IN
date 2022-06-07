import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';

function Rover() {

    const [Xpos, setXpos] = React.useState(null);
    const [Ypos, setYpos] = React.useState(null);
    const [Angle, setAngle] = React.useState(null);
    const [Battery, setBattery] = React.useState(null);
    const [Latest, setLatest] = React.useState(null);

  
    React.useEffect(() => {
      fetch("/coords")
        .then((res) => res.json())
        .then((Ypos) => setYpos(Ypos.ycoord));
    }, []);
  
    React.useEffect(() => {
      fetch("/coords")
        .then((res) => res.json())
        .then((Xpos) => setXpos(Xpos.xcoord));
    }, []);

    React.useEffect(() => {
        fetch("/coords")
          .then((res) => res.json())
          .then((Angle) => setAngle(Angle.angle));
      }, []);

      React.useEffect(() => {
        fetch("/coords")
          .then((res) => res.json())
          .then((Battery) => setBattery(Battery.battery));
      }, []);

      React.useEffect(() => {
        fetch("/coords")
          .then((res) => res.json())
          .then((Latest) => setLatest(Latest.latest));
      }, []);

    
      /*function getBattery(){
        //var battery;
        console.log("test");
        axios.get("/coords")
        .then(response=>{
          battery=response.data.battery;
          console.log("battery 1:",battery);
        })
        .catch(err => {
          console.log(err);
        })
        return battery;
      }*/

      /*React.useEffect(() => {
        axios.get("/coords")
        .then(response=>{
          battery=response.data.battery;
          console.log("battery 1:",battery);
        })
        .catch(err => {
          console.log(err);
        })
      }, []) 
      console.log("battery 2", battery);*/

  
    return (
        <div>
          <p>y coordinate: {!Ypos ? "Loading..." : Ypos}</p>
          <p>x coordinate: {!Xpos ? "Loading..." : Xpos}</p>
          <p>angle: {!Angle ? "Loading..." : Angle}</p>
          <p>last update: {!Latest ? "Loading..." : Latest}</p>
          <p>battery: {!Battery ? "Loading..." : Battery}</p>
        </div>
    );
  }
  
  export default Rover;