import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Index from './pages/index';
import Battery from './pages/battery';
import About from './pages/about';
import Map from './pages/map';
import Gridmap from './pages/gridmap';
import Control from './pages/control';
import Navbar from './pages/components/navbar'
import React from 'react';
//import GridSquare from './components/gridsquare'

import { Nav } from './pages/components/navbar/NavbarElements';


function App(){
  return ( 
    <div className="App">
        <Navbar/>

      { <Routes>
        <Route path="/" element={ <Index/> } />
        <Route path="about" element={ <About/> } />
        <Route path="battery" element={ <Battery/> } />
        <Route path="control" element={ <Control/> } />
        <Route path="map" element={ <Map/> } />
        <Route path="gridmap" element={ <Gridmap/> } />
      </Routes> }



  </div>
  // > <Index />  <About /> <Battery /> <Control /> <Map /> </div>);
  )
}

export default App; 


