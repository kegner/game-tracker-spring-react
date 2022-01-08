import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import toastReducer from './toastReducer';
import authenticationReducer from './authenticationReducer';

export default combineReducers({
  gameReducer,
  toastReducer,
  authenticationReducer
});