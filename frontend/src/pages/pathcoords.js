import { useState } from "react";
import ReactDOM from 'react-dom/client';

export default function PathCoords(props) {{
  const [coordsx, coordsy, setCoordsx, setCoordsy] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The coordinates you entered were: ${coordsx} , ${coordsy}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter coordinates to route to:
        <input 
          type="number" 
          value={coordsx}
          onChange={(e) => setCoordsx(e.target.value)}
        /> <input 
          type="number" 
          value={coordsy}
          onChange={(e) => setCoordsy(e.target.value)}
        /> 
      </label>
      <input type="Submit" />
    </form>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PathCoords />);
}