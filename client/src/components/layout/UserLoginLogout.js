import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import axios from 'axios';
import { clearUserData } from '../../actions/authenticationActions';
import { getCurrentUser } from '../../services/authenticationService';

const UserLoginLogout = () => {

  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(state => state.authenticationReducer);

  const history = useHistory();

  const logoutHandler = async () => {
    try {
      await axios.post("/logout");
      // Need to hit server again after logging out for local development
      if (process.env.NODE_ENV === "development") {
        await getCurrentUser();
      }
      dispatch(clearUserData());
      history.push("/logout");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ul className="navbar-nav ms-auto">
      <li className="nav-item">
        {isLoggedIn && <span className="d-block py-2 px-2 text-white">{`Hello, ${user.firstName}`}</span>}
      </li>
      <li className="nav-item">
        {!isLoggedIn && <NavLink className={isActive => "nav-link" + (isActive ? " active" : "")} to="/login">Sign In</NavLink>}
        {isLoggedIn && <button className="btn btn-link nav-link" onClick={logoutHandler}>Sign Out</button>}
      </li>
    </ul>
  )
}

export default UserLoginLogout
