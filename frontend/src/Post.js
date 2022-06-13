import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';

function Post() {


    
    function postDirection(dir){
        const packet = {
            direction: dir,
        }
        axios.post("/move", packet)
        .then((response) => {
        console.log("posted move", packet, response.status); //should return 200 ok
        });
    }


    //sample function to post input coordinates to backend
    function postCoords(x, y){
        const coords = {
            x: x,
            y: y
        }
        axios.post("/coords", coords)
        .then((response) => {
            console.log(response.status); //should return 200 ok
        });
    }

    //postDirection("r");

    //right now postCoords just gets called an arbitrary number of times instead of when the button is actually clicked. No idea why
    return (
        <div>
          <button>
              Post coordinates
          </button>
        </div>
    );
  }
  
  export default Post;