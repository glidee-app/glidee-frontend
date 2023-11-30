// Importing necessary modules and components
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/images/logo.png';
import auth from "../services/auth";

// Functional component definition
const Header = () => {
  // State hook to manage the menu's open/close state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // JSX markup for the header
  return (
    <>
      <header className="bg-primary text-white flex items-start lg:items-center justify-between p-5 md:p-10">
        {/* Logo and brand name */}
        <NavLink to="/" className="flex items-center">
          <img src={logo} className="lg:w-12 w-8 inline-block mr-2" alt="Glidee Logo" />
          <span className="text-2xl font-medium">Glidee</span>
        </NavLink>

        {/* Navigation links based on user authentication status */}
        <nav className="hidden lg:block">
          {auth.isTokenExpired()
            ?
            <>
              <NavLink to="/" className={({ isActive }) =>
                `${isActive && "text-gray-300"} p-3`
              }>Home</NavLink>
              <NavLink to="/login" className={({ isActive }) =>
                `${isActive && "text-gray-300"} p-3`
              }>Login</NavLink>
              <NavLink to="/signup" className={({ isActive }) =>
                `${isActive && "text-gray-300"} p-3 pr-0`
              }>Signup</NavLink>
            </>
            :
            <>
              <NavLink to="/dashboard" className={({ isActive }) =>
                `${isActive && "text-gray-300"} p-3`
              }>Dashboard</NavLink>
              <NavLink to="/book-ride" className={({ isActive }) =>
                `${isActive && "text-gray-300"} p-3`
              }>Book Ride</NavLink>
              <NavLink to="/order-history" className={({ isActive }) =>
                `${isActive && "text-gray-300"} p-3`
              }>Ride History</NavLink>
              <NavLink to="/logout" className={({ isActive }) =>
                `${isActive && "text-gray-300"} p-3 pr-0 text-red-500`
              }>Logout</NavLink>
            </>
          }
        </nav>

        {/* Mobile menu button and navigation for smaller screens */}
        <div className="lg:hidden block text-lg">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          {isMenuOpen &&
            <nav className="flex flex-col bg-white text-secondary absolute top-16 w-full right-0">
              <NavLink to="/" className={({ isActive }) =>
                `${isActive && "text-gray-500"} p-3`
              }>Home</NavLink>
              <NavLink to="/login" className={({ isActive }) =>
                `${isActive && "text-gray-500"} p-3`
              }>Login</NavLink>
              <NavLink to="/signup" className={({ isActive }) =>
                `${isActive && "text-gray-500"} p-3 pr-0`
              }>Signup</NavLink>
            </nav>
          }
        </div>
      </header>
    </>
  )
}

// Exporting the Header component
export default Header;
