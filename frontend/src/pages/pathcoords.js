 import { useState } from "react";
import ReactDOM from 'react-dom/client';
import React from 'react';
import axios from 'axios';



export default function PathCoords(props) {{
  const [coordsx, coordsy, setCoordsx, setCoordsy] = useState("");

  function PostCoords(coordsx, coordsy){
    axios.post("/coords", coordsx, coordsy)
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
          type="string" 
          value={coordsx}
          onChange={(e) => setCoordsx(e.target.value)}
        /> <input 
          type="string" 
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
