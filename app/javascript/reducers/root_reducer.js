import { combineReducers } from "redux";
import gameReducer from "./game_reducer";
import playReducer from "./play_reducer";
import userReducer from "./user_reducer";

// All reducers are combined at root
const rootReducer = combineReducers(
  {
    games: gameReducer,
    hangman: playReducer,
    mastermind: playReducer,
    memorycard: playReducer,
    tictactoe: playReducer,
    users: userReducer
  }
)

export default rootReducer