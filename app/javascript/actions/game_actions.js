import { FETCH_GAMES, SET_GAME, SET_GAME_PATH, SET_GAME_POINTS } from "./types"

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

export const setGame = (game) => dispatch => {
  dispatch(
    {
      type: SET_GAME,
      payload: game
    }
  )
}

export const setGamePath = (gamePath) => dispatch => {
  dispatch(
    {
      type: SET_GAME_PATH,
      payload: gamePath
    }
  )
}

export const setPoints = (points) => dispatch => {
  dispatch(
    {
      type: SET_GAME_POINTS,
      payload: points
    }
  )
}