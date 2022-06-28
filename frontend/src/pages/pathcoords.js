import { useState } from "react";
import ReactDOM from 'react-dom/client';
import React from 'react';
import axios from 'axios';


export default function PathCoords(props) {{
  const [coordsx, setCoordsx] = useState("");
  const [coordsy, setCoordsy] = useState("");

  function PostCoords(coordsx, coordsy){
    const coords = {
      x: coordsx,
      y:  coordsy
    };
    console.log(coords);
    axios.post("/coords", coords)
            .then((response) => {
                console.log(response.status); //should return 200 ok
            });
        }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The coordinates you entered were: ${coordsx} , ${coordsy}`);
    PostCoords(coordsx,coordsy)
             

  }
  

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter coordinates to route to:
        <input 
          type="int" 
          value={coordsx}
          onChange={(e) => setCoordsx(e.target.value)}
        /> <input 
          type="int" 
          value={coordsy}
          onChange={(e) => setCoordsy(e.target.value)}
        /> 
      </label>
      <input type="Submit" />
    </form>
  )
  }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PathCoords />);}