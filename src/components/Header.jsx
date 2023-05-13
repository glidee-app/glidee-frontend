import { NavLink } from "react-router-dom";
import logo from '../assets/images/logo.png';
import auth from "../services/auth";

const Header = () => {
  return (
    <>
      <header className="bg-primary text-white flex justify-between items-center p-5 md:p-10">
        <NavLink to="/" >
          <img src={logo} className="md:w-20 w-12" />
        </NavLink>
        <nav>
          {!auth.getCurrentUser()
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
              <NavLink to="/signup" className={({ isActive }) =>
                `${isActive && "text-gray-300"} p-3 pr-0`
              }>Ride History</NavLink>
            </>
          }
        </nav>
      </header>
    </>
  )
}

export default Header;
