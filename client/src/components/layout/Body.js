import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { setUserData, clearUserData } from '../../actions/authenticationActions';
import { getCurrentUser } from '../../services/authenticationService';
import MainPage from '../pages/MainPage'
import Login from '../pages/Login'
import Logout from '../pages/Logout';
import Signup from '../pages/Signup';
import ToastMessageContainer from './ToastMessageContainer'

const Body = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  
  const { isLoggedIn, initialLoad } = useSelector(state => state.authenticationReducer);

  useEffect(() => {
    const onLocationChange = async () => {
      if (isLoggedIn || initialLoad) {
        const user = await getCurrentUser();
        if (!user) {
          dispatch(clearUserData());
        } else if (initialLoad && user) {
          dispatch(setUserData(user));
        }
      }
    }

    onLocationChange();
  }, [location, isLoggedIn, initialLoad, dispatch]);

  return (
    <div className="container">
      <Route path="/" exact render={props => {
        if (isLoggedIn) {
          return <MainPage />;
        } else if (initialLoad) {
          return <></>;
        } else {
          return <Redirect to="/login" />;
        }
      }}>
      </Route>
      <Route path="/signup" exact>
        <Signup />
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/logout" exact>
        <Logout />
      </Route>
      <ToastMessageContainer />
    </div>
  )
}

export default Body
