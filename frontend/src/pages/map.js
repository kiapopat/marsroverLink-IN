import React from 'react'
import Obstacles from './Obstacles';

function Map() {
    return (
        <div
        style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100'
            }}
        >
        
            <h1>Map</h1>
            <Obstacles /> 
        </div>
    )
}

export default Map;

