import { FETCH_GAMES, SET_GAME, SET_GAME_PATH, SET_GAME_POINTS } from "../actions/types"

// Initial state necessary for all games
const initialState = {
  game: '',
  gamePath: '',
  games: [],
  points: 0
}

// Reducer function
function gameReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GAMES:
      return {
        ...state,
        games: action.payload
      }
    case SET_GAME:
      return {
        ...state,
        game: action.payload
      }
    case SET_GAME_PATH:
      return {
        ...state,
        gamePath: action.payload
      }
    case SET_GAME_POINTS:
      return {
        ...state,
        points: action.payload
      }
    default:
      return state
  }
}

export default gameReducer