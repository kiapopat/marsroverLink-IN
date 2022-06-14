import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Index from './pages/index';
import Battery from './pages/battery';
import About from './pages/about';
import Map from './pages/map';
import Control from './pages/control';
import React from 'react';


function App(){
  return ( 
    <div className="App">
      <Routes>
        <Route path="/" element={ <Index/> } />
        <Route path="about" element={ <About/> } />
        <Route path="battery" element={ <Battery/> } />
        <Route path="control" element={ <Control/> } />
        <Route path="map" element={ <Map/> } />
      </Routes>


  </div>
  // > <Index />  <About /> <Battery /> <Control /> <Map /> </div>);
  )
}

export default App; 


