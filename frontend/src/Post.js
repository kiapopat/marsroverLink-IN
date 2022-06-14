import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';

function Post() {

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

    //right now postCoords just gets called an arbitrary number of times instead of when the button is actually clicked. No idea why
    return (
        <div>
          <button onClick={postCoords(5,3)}>
              Post coordinates
          </button>
        </div>
    );
  }
  
  export default Post;