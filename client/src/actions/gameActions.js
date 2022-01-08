import axios from 'axios';
import { showSuccessToast, showErrorToast } from './toastActions';

export const SELECT_GAME = "SELECT_GAME";
export const FETCH_GAMES = "FETCH_GAMES";
export const CREATE_GAME = "CREATE_GAME";
export const UPDATE_GAME = "UPDATE_GAME";
export const DELETE_GAME = "DELETE_GAME";
export const START_LOADING = "START_LOADING";
export const START_SAVING = "START_SAVING";
export const STOP_LOADING = "STOP_LOADING";
export const STOP_SAVING = "STOP_SAVING";

const fetchSuccess = (games) => ({
  type: FETCH_GAMES,
  payload: { games }
});

const createSuccess = (game) => ({
  type: CREATE_GAME,
  payload: { game }
});

const updateSuccess = (game) => ({
  type: UPDATE_GAME,
  payload: { game }
});

const deleteSuccess = (id) => ({
  type: DELETE_GAME,
  payload: { id }
});

const startLoading = () => ({
  type: START_LOADING
});

const startSaving = () => ({
  type: START_SAVING
});

const stopLoading = () => ({
  type: STOP_LOADING
});

const stopSaving = () => ({
  type: STOP_SAVING
});

const errorHandler = (error, dispatch) => {
  const validResponses = [404, 409];
  if (error && error.response && validResponses.includes(error.response.status)) {
    // this is the expected error format for Spring exception messages
    dispatch(showErrorToast(error.response.data.message));
  } else {
    console.error(error);
  }
};

export const selectGame = (game) => ({
  type: SELECT_GAME,
  payload: { game }
});

export const fetchGames = (userId) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const res = await axios.get("/api/v1/games", { params: { userId } });
    dispatch(fetchSuccess(res.data.games));
  } catch (error) {
    dispatch(stopLoading());
    errorHandler(error, dispatch);
  }
};

export const createGame = (game) => async (dispatch) => {
  dispatch(startSaving());

  try {
    const res = await axios.post("/api/v1/games", game);

    dispatch(createSuccess(res.data));
    dispatch(showSuccessToast("Game added."));
  } catch (error) {
    dispatch(stopSaving());
    errorHandler(error, dispatch);
  }
};

export const updateGame = (game) => async (dispatch) => {
  dispatch(startSaving());

  try {
    const res = await axios.put("/api/v1/games", game);

    dispatch(updateSuccess(res.data));
    dispatch(showSuccessToast("Game updated."));
  } catch (error) {
    dispatch(stopSaving());
    errorHandler(error, dispatch);
  }
};

export const deleteGame = (id) => async (dispatch) => {
  dispatch(startSaving());

  try {
    await axios.delete(`/api/v1/games/${id}`);
    dispatch(deleteSuccess(id));
    dispatch(showSuccessToast("Game deleted."));
  } catch (error) {
    dispatch(stopSaving());
    errorHandler(error, dispatch);
  }
};