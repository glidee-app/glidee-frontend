import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/images/logo.png';
import auth from "../services/auth";

const Header = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-primary text-white flex items-start lg:items-center justify-between p-5 md:p-10">
        <NavLink to="/" className="flex items-center">
          <img src={logo} className="lg:w-12 w-8 inline-block mr-2" />
          <span className="text-2xl font-medium">Glidee</span>
        </NavLink>
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

export default Header;
