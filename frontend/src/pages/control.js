import React from 'react'
import './control.css';
import axios from 'axios';

function postDirection(dir){
    const packet = {
        direction: dir,
    }
    axios.post("/move", packet)
    .then((response) => {
    console.log("posted move", packet.direction, response.status); //should return 200 ok
    });
}

function button(value) {
    document.getElementById('forward').disabled=false;	
    document.getElementById('backward').disabled=false;
    document.getElementById('left').disabled=false;
    document.getElementById('right').disabled=false;
    document.getElementById('stop').disabled=false;
    if (value === 'right'){
        postDirection("r");
    }
    if (value === 'left'){
        postDirection("l");
    }
    if (value === 'forward'){
        postDirection("f");
    }
    if (value === 'backward'){
        postDirection("b");
    }
    if (value === 'stop'){
        postDirection("s");
    }
}

function Control() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100'
            }}
        >
           <h1 className="header1">Control</h1>
          
           
            <input id="right" class="button" type="button" value="right" onClick={() => button('right')}/>
            <input id="forward" class="button"  type="button" value="forward" onClick={() => button('forward')}/>
            <input id="backward" class="button"  type="button" value="back" onClick={() => button('backward')}/>
            <input id="left" class="button"  type="button" value="left" onClick={() => button('left')}/>
            <input id="stop" class="button"  type="button" value="stop" onClick={() => button('stop')}/>

</div>
           
    );
};

export default Control; 