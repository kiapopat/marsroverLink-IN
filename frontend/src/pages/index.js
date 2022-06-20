import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
  <div className="div1">
            <h1 className="header1">Mars Rover Link-IN</h1>
      <br/>
      <Link to="about">Click to view our about page</Link>
      <br/>
      <br/>
      <Link to="battery">Click to view the battery status</Link>
      <br/>
      <br/>
      <Link to="control">Click to manually control the rover</Link>
      <br/>
      <br/>
      <Link to="map">Click to view the pathfinder</Link>
      <br/>
      <br/>
      <Link to="gridmap">Click to view the map</Link>
    </div> 
      
  );
};

export default Home;