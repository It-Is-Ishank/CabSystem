import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/" className="myvahan-logo">
        MyVahan
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/bookings">Bookings</Link>
          </li>
          <li>
            <Link to="/cabs">Cabs</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;