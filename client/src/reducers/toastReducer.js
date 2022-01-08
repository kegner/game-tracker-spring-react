import { SHOW_SUCCESS, SHOW_ERROR, HIDE_TOAST } from "../actions/toastActions";
import { v4 } from 'uuid';

const initialState = {
  toasts: []
};

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SUCCESS:
      return showToast(state, false, action.payload.message);
    
    case SHOW_ERROR:
      return showToast(state, true, action.payload.message);
    
    case HIDE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload.id)
      };
    
    default:
      return state;
  }
}

const showToast = (state, isError, message) => {
  let newToast = {
    id: v4(),
    isError,
    message
  };
  
  return {
    ...state,
    toasts: [...state.toasts, newToast]
  };
}

export default toastReducer;