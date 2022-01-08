import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import FormItem from '../form/FormItem';
import { setUserData, clearUserData } from '../../actions/authenticationActions';
import { showErrorToast } from '../../actions/toastActions';
import { getCurrentUser } from '../../services/authenticationService';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.authenticationReducer);

  const history = useHistory();

  const setState = (e, setter) => {
    setter(e.target.value);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    
    try {
      await axios.post("/login", form);
      const user = await getCurrentUser();
      if (user) {
        dispatch(setUserData(user));
        history.push("/");
      } else {
        dispatch(clearUserData());
      }
    } catch (error) {
      dispatch(showErrorToast("Login failed."));
      console.error(error);
    }
  }

  return (
    <>
      {!isLoggedIn && <form>
        <div className="row mb-4">
          <div className="col-6">
            <FormItem id="username" label="Username" value={username} type="text"
              onChange={(e) => setState(e, setUsername)} />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-6">
            <FormItem id="password" label="Password" value={password} type="password"
              onChange={(e) => setState(e, setPassword)} />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-6">
            <button className="btn btn-primary" type="submit" onClick={submitHandler}>Submit</button>
          </div>
        </div>
      </form>}
      {isLoggedIn && <div>
        You are already logged in.
      </div>}
    </>
  )
}

export default Login
