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
  /*  <button onClick={postCoords(5,3)}>
              Post coordinates
          </button> */

          //var num = document.getElementById("num1").value
          //console.log(num);

    //right now postCoords just gets called an arbitrary number of times instead of when the button is actually clicked. No idea why
    return (
        <div>
            <form id="form1">
                <label for="num1">Input number:</label ><br></br>
                <input type="int" id="num1" name="num1" /><br></br>
            </form>
            <form id="form1">
                <label for="num2">Input number:</label ><br></br>
                <input type="text" id="num1" name="num2" /><br></br>
                <input type="int" value="Check!" onclick={postCoords(document.getElementById("num1").value, document.getElementById("num2").value)} />
            </form>
        </div>
    );
  }
  
  export default Post;