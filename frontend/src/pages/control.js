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
        <div className="div1">
            <h1 className="header1">Control</h1>
        <div
        
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100'
            }}
        > 
            <input id="Manual" class="button" type="button" value="MANUAL" onClick={() => button('manual')}/>
            <input id="Auto" class="button" type="button" value="AUTOMATIC" onClick={() => button('automatic')}/>
            <br/> 
            <br/> 
           
        <div
        style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100'
            }}>
           
            <input id="left" class="button"  type="button" value="LEFT" onClick={() => button('left')}/>
            <input id="forward" class="button"  type="button" value="FORWARD" onClick={() => button('forward')}/>
            <input id="backward" class="button"  type="button" value="BACKWARD" onClick={() => button('backward')}/>
            <input id="right" class="button" type="button" value="RIGHT" onClick={() => button('right')}/>
            <input id="stop" class="button"  type="button" value="STOP" onClick={() => button('stop')}/>

        </div> </div> </div> 
    );
};

export default Control; 