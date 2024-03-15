import React, { useRef, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  
  return (
    <header className="navbar">
      <Link to="/">
        <span className="myvahan-logo">MyVahan</span>
      </Link>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn">
        <span className="navicon"></span>
      </label>
      <ul className="menu">
        <li>
          <Link
            style={{ textDecoration: "none", border: "none", color: "black" }}
            to="/cabs"
          >
            <div>Edit Cabs</div>
          </Link>
        </li>
        <li>
          <Link
            style={{ textDecoration: "none", border: "none", color: "black" }}
            to="/bookings"
          >
            <div id="doubt_link">View Bookings</div>
          </Link>
        </li>
        
      </ul>
    </header>
  );
};

export default Navbar;