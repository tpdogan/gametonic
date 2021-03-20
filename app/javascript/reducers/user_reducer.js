import { CREATE_USER, FETCH_USERS, NEW_USER, SET_GAME } from "../actions/types"

const initialState = {
  authenticity_token: '',
  game: '',
  newUser: {},
  users: []
}

function userReducer(state = initialState, action){
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        newUser: action.payload
      }
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload
      }
    case NEW_USER:
      return {
        ...state,
        authenticity_token: action.payload
      }
    case SET_GAME:
      return {
        ...state,
        game: action.payload
      }
    default:
      return state
  }
}

export default userReducer