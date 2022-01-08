import {
  SELECT_GAME, FETCH_GAMES, CREATE_GAME, UPDATE_GAME, DELETE_GAME, START_LOADING,
  START_SAVING, STOP_LOADING, STOP_SAVING
} from "../actions/gameActions";

const initialState = {
  games: [],
  selectedGame: {},
  loading: false,
  saving: false
};

let games;
let selectedGame;

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_GAME:
      return {
        ...state,
        selectedGame: action.payload.game
      };
    
    case FETCH_GAMES:
      selectedGame = action.payload.games && action.payload.games.length > 0 ? action.payload.games[0] : {};

      return {
        ...state,
        games: action.payload.games,
        selectedGame,
        loading: false
      };
    
    case CREATE_GAME:
      return {
        ...state,
        games: [...state.games, action.payload.game],
        selectedGame: action.payload.game,
        saving: false
      };
    
    case UPDATE_GAME:
      const updatedGame = action.payload.game;
      games = state.games.map(game => (
        game.id === updatedGame.id ? updatedGame : game
      ));

      return {
        ...state,
        games,
        selectedGame: action.payload.game,
        saving: false
      };
    
    case DELETE_GAME:
      const id = action.payload.id;
      games = state.games.filter(game => game.id !== id);
      selectedGame = games.length > 0 ? games[0] : {};

      return {
        ...state,
        games,
        selectedGame,
        saving: false
      };
    
    case START_LOADING:
      return {
        ...state,
        loading: true
      };
    
    case START_SAVING:
      return {
        ...state,
        saving: true
      };
    
    case STOP_LOADING:
      return {
        ...state,
        loading: false
      };
    
    case STOP_SAVING:
      return {
        ...state,
        saving: false
      };
    
    default:
      return state;
  }
}

export default gameReducer;