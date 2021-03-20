import { FETCH_GAMES } from "../actions/types"

const initialState = {
  games: []
}

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GAMES:
      return {
        ...state,
        games: action.payload
      }
    default:
      return state
  }
}

export default gameReducer