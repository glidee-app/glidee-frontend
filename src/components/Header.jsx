import { NavLink } from "react-router-dom";
import logo from '../assets/images/logo.png';

const Header = () => {
  return (
    <>
      <header className="bg-primary text-white flex justify-between items-center p-5 md:p-10">
        <NavLink to="/" >
          <img src={logo} className="md:w-20 w-12" />
        </NavLink>
        <nav>
          <NavLink to="/" className={({ isActive }) =>
            `${isActive && "text-gray-300"} p-3`
          }>Home</NavLink>
          <NavLink to="/login" className={({ isActive }) =>
            `${isActive && "text-gray-300"} p-3`
          }>Login</NavLink>
          <NavLink to="/signup" className={({ isActive }) =>
            `${isActive && "text-gray-300"} p-3 pr-0`
          }>Signup</NavLink>
        </nav>
      </header>
    </>
  )
}

export default Header;
