import { FETCH_GAMES, SET_GAME, SET_GAME_PATH, SET_GAME_POINTS } from "./types"

// Fetch all available games
export const fetchGames = () => dispatch => {
  fetch('api/games')
    .then( response => response.json() )
    .then( data => {
      dispatch(
        {
          type: FETCH_GAMES,
          payload: data.games
        }
      )
    })
}

// Set the current playing game
export const setGame = (game) => dispatch => {
  dispatch(
    {
      type: SET_GAME,
      payload: game
    }
  )
}

// Set the request path for the current playing game
// This actually only sets the plural of the game, necessary = for rails
export const setGamePath = (gamePath) => dispatch => {
  dispatch(
    {
      type: SET_GAME_PATH,
      payload: gamePath
    }
  )
}

// Set the number of points of the current playing game
export const setPoints = (points) => dispatch => {
  dispatch(
    {
      type: SET_GAME_POINTS,
      payload: points
    }
  )
}