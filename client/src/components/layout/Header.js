import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import UserLoginLogout from './UserLoginLogout';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Game Tracker</Link>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className={isActive => "nav-link" + (isActive ? " active" : "")} to="/" exact>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={isActive => "nav-link" + (isActive ? " active" : "")} to="/signup">Sign Up</NavLink>
          </li>
        </ul>
        <UserLoginLogout />
      </div>
    </nav>
  )
}

export default Header
