import { FETCH_GAMES } from "./types"

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