import React from "react";
import {
    Nav,
    NavLogo,
    NavLink,
    NavBtn,
    NavBtnLink

} from "./NavbarElements";

import {FaBars} from 'react-icons/fa'
const Navbar = () => {
    return (
        <>
           <Nav class="navbar navbar-expand-lg bg-black">
           <div class="container-fluid">
            <NavLogo to="/" class="navbar-brand">
                Link-IN
            </NavLogo>
            <button class="navbar-toggler" style={{float: "right", marginTop: "10px"}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <FaBars color = "white" />
                </button>

            <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
      <li class="nav-item">

                <NavLink 
                    class="nav-link"
                  to="/about" 
                  activeStyle={{ color: 'black' }}
                >
                    About
                </NavLink>
                </li>
                <li class="nav-item">
                <NavLink 
                  to="/control" 
                  activeStyle={{ color: 'black' }}
                >
                    Control
                </NavLink>
                </li>
                <li class="nav-item">
                <NavLink 
                  to="/gridmap" 
                  activeStyle={{ color: 'black' }}
                >
                    Map

                    </NavLink>
                </li>
                <li class="nav-item">
                <NavLink 
                  to="/battery" 
                  activeStyle={{ color: 'black' }}
                >
                    Battery

                    </NavLink>
                </li>
                <li class="nav-item">
                <NavLink 
                  to="/map" 
                  activeStyle={{ color: 'black' }}
                >
                    Pathfinder
                 </NavLink>
                </li>
                <li class="nav-item">
                <NavBtn>
                    <NavBtnLink to="/post">Route to...</NavBtnLink>                
                </NavBtn> 
                </li>

            </ul>
    </div>
            </div> 
           </Nav> 
        </>
    );
};
export default Navbar;