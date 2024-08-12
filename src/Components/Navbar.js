import React, { useState } from "react";
import { Link} from "react-router-dom";
import logo from './assets/log.png';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-lg h-16">
      <div className="w-full px-0 flex justify-between h-full">
        {/* Left section with logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-20 w-40 ml-6" />
            </Link>
          </div>
        
        {/* Center section with primary nav items */}
        <div className="hidden md:flex flex-grow justify-center space-x-4">
          <Link
            to="/home"
            className="py-4 px-2 text-blue-900 text-md border-b-4 border-blue-900 font-semibold"
          >
            Home
          </Link>
          <Link
            to="/event"
            className="py-4 px-2 text-gray-500 text-md font-semibold hover:text-blue-900 transition duration-300"
          >
            Product 
          </Link>
          <Link
            to="/feedback"
            className="py-4 px-2 text-gray-500 text-md font-semibold hover:text-blue-900 transition duration-300"
          >
            Contact
          </Link>
          
        </div>
        
        {/* Right section with secondary nav items */}
        <div className="hidden md:flex items-center space-x-3 flex-grow-0 mr-20">
          <Link
            to="/login"
            className="py-2 px-4 font-bold text-white bg-blue-950 hover:bg-blue-900 rounded-lg transition duration-300"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="py-2 px-4 font-bold text-white bg-blue-950 hover:bg-blue-900 rounded-lg transition duration-300"
          >
            Sign Up
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center ml-auto">
          <button
            className="outline-none mobile-menu-button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-500 hover:text-green-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <ul className="bg-green-500 text-white">
            <li>
              <Link
                to="/home"
                className="block text-sm px-2 py-4 font-semibold"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/event"
                className="block text-sm px-2 py-4 hover:bg-green-600 transition duration-300"
              >
                Product
              </Link>
            </li>
            <li>
              <Link
                to="/feedback"
                className="block text-sm px-2 py-4 hover:bg-green-600 transition duration-300"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block text-sm px-2 py-4 hover:bg-green-600 transition duration-300"
              >
                Log In
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="block text-sm px-2 py-4 hover:bg-green-600 transition duration-300"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
