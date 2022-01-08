export const SHOW_SUCCESS = "SHOW_SUCCESS";
export const SHOW_ERROR = "SHOW_ERROR";
export const HIDE_TOAST = "HIDE_TOAST";

export const showSuccessToast = (message) => ({
  type: SHOW_SUCCESS,
  payload: { message }
});

export const showErrorToast = (message) => ({
  type: SHOW_ERROR,
  payload: { message }
});

export const hideToast = (id) => ({
  type: HIDE_TOAST,
  payload: { id }
});