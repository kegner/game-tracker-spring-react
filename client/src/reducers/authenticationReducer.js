import { SET_USER, CLEAR_USER } from "../actions/authenticationActions";

const initialState = {
  isLoggedIn: false,
  user: {},
  initialLoad: true
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        initialLoad: false
      };
    
    case CLEAR_USER:
      return {
        ...state,
        isLoggedIn: false,
        user: {},
        initialLoad: false
      };
    
    default:
      return state;
  }
}

export default authenticationReducer;