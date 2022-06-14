import React from "react";
import './about.css';


const About = () => {
    return (
<div className="div1">
            <h1 className="header1">Mars Rover Project</h1>
            
            
            <div className="content">
            <p className="text">
                <br/>
                The task was to design and develop an autonomous Mars Rover capable of remotely discovering its environment 
                without any direct supervision. The battery level, a manual controlling system, and a map of the environment is available on the webapp for the user. 
                This webapp is built using the React framework, using mainly Javascript with some CSS.
            
                <br/>
                <br/>    
            </p>
            </div>

            <div className="content2" >
            <h1 className="title2">What can it do?</h1>
            <br/>
            <p className="text1">
                We have currently implemented: <br/>
                <br/>
                <p className="list">
                <span className="font">A Pathfinding Algorithm</span> This helps the rover find a path through obstacles<br/><br/>
                <span className="font">Synchronisation with the webapp</span> A map is displayed in real time, as the rover investigates its environment, to show where obstacles are. <br/><br/>
                <span className="font">Manual Control Mode</span>  The rover can be controlled via this webapp <br/><br/>
                <span className="font">Battery Health </span> Shows the current battery level of the rover, and alerts if it requires charging. <br/>
                </p>
            </p>
            </div>

            <div className="content3">
            <h1 className="title3">About Us</h1>
            
            <p className="text2">
                <br/>
                The rover has been designed by our group for the project this term, over the time period of about a month.<br/>
                The design and development was divided into 7 subsystems:
                <br/><br/>
                <p className="list">
                [Control subsystem]:  Pablo and Henry<br/>
                [Vision subsystem]: Haidar<br/>
                [Radar subsystem]: Murilo<br/>
                [Enery subsystem]:  Parag<br/>
                [Command subsystem]: Kia and Henry <br/>
                [Drive subsystem]: Thomas<br/>
                [Integration subsystem]: All of us worked together on this<br/>
                </p>
                <br/> 

            </p>
            </div> 
    
        </div>           
    );
}
export default About;