import {
  SET_AUTH_TOKEN,
  SET_BOARD,
  SET_BOARD_ID,
  SET_POINTS,
  SET_STATUS,
  SET_WINNER
} from "../actions/types"

// Initial state necessary for all moves during game
const initialState = {
  authenticity_token: '',
  board: [],
  id: '',
  points: 0,
  status: {},
  winner: 0
}

// Reducer function
function playReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        authenticity_token: action.payload
      }
    case SET_BOARD:
      return {
        ...state,
        board: action.payload
      }
    case SET_BOARD_ID:
      return {
        ...state,
        id: action.payload
      }
    case SET_POINTS:
      return {
        ...state,
        points: action.payload
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.payload
      }
    case SET_WINNER:
      return {
        ...state,
        winner: action.payload
      }
    default:
      return state
  }
}

export default playReducer