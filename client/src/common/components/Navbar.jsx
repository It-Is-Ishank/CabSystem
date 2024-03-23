import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar flex justify-between items-center bg-white shadow-md w-full h-16 sticky top-0 z-50">
      <Link to="/" className=" block py-4 text-2xl text-gray-700 px-4  hover:bg-gray-100">
        My<span className="text-red-500">Vahan</span>
      </Link>
      <nav>
        <ul className="flex">
          <li>
            <Link
              to="/bookings"
              className="block py-4 px-6 text-gray-700 hover:bg-gray-100 transition duration-200"
            >
              Bookings
            </Link>
          </li>
          <li>
            <Link
              to="/cabs"
              className="block py-4 px-6 text-gray-700 hover:bg-gray-100 transition duration-200"
            >
              Cabs
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
