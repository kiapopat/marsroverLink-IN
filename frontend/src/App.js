
import logo from './logo.svg';
import './App.css';
import Rover from './Rover';
import React from 'react';
function App(){
  return ( <Rover />);
}

export default App;
/*import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {

  const [Xpos, setXpos] = React.useState(null);
  const [Ypos, setYpos] = React.useState(null);

  React.useEffect(() => {
    fetch("/coords")
      .then((res) => res.json())
      //.then((Xpos) => setXpos(Xpos.xcoord))
      .then((Ypos) => setYpos(Ypos.ycoord) && (Xpos) => setXpos(Xpos.xcoord));
  }, []);

  /*React.useEffect(() => {
    fetch("/coords")
      .then((res) => res.json())
      //.then((Xpos) => setXpos(Xpos.xcoord))
      .then((Xpos) => setXpos(Xpos.xcoord));
  }, []);*/

  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{!Xpos ? "Loading..." : Xpos}</p>
        <p>{!Ypos ? "Loading..." : Ypos}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */
