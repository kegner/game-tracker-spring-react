export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";

export const setUserData = (user) => ({
  type: SET_USER,
  payload: { user }
});

export const clearUserData = () => ({
    type: CLEAR_USER
});