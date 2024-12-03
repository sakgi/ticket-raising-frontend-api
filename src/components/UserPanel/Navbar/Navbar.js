  import React from 'react';
  import { FaBars } from 'react-icons/fa';
  import './Navbar.css';
  import logo from '../../Auth/Logo.png';

  const Navbar = ({ toggleSidebar }) => {
    return (
      <nav className="navbar-trt">
        <div className="navbar-container-trt">
          <div className="menu-icon-trt" onClick={toggleSidebar}>
            <FaBars />
          </div>
          <div className="navbar-logo-trt">
            <img
              // src="https://instagrp.com/images/logo_light.png"
              src={logo}
              alt="Company Logo"
            />
          </div>
        </div>
      </nav>
    );
  };

  export default Navbar;
