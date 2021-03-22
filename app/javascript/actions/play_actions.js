import {
  SET_AUTH_TOKEN,
  SET_BOARD,
  SET_BOARD_ID,
  SET_POINTS,
  SET_STATUS,
  SET_WINNER
} from "./types"

// Change the board with a given one
export const changeBoard = (board) => dispatch => {
  dispatch({
    type: SET_BOARD,
    payload: board
  })
}

// Reset the board by requesting a new game
export const resetBoard = (gamePath) => dispatch => {
  fetch(`api/${gamePath}/new`)
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: SET_AUTH_TOKEN,
        payload: data.authenticity_token
      })
      dispatch({
        type: SET_BOARD,
        payload: data.board
      })
      dispatch({
        type: SET_BOARD_ID,
        payload: data.id
      })
      dispatch({
        type: SET_STATUS,
        payload: data.status
      })
      dispatch({
        type: SET_WINNER,
        payload: data.winner
      })
    })
}

// Submit the board after play
export const submitBoard = (gamePath, boardData) => dispatch => {
  fetch(
    `api/${gamePath}/${boardData.id}`,
    {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(boardData)
    }
  )
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: SET_BOARD,
        payload: data.board
      })
      dispatch({
        type: SET_POINTS,
        payload: data.points
      })
      dispatch({
        type: SET_STATUS,
        payload: data.status
      })
      dispatch({
        type: SET_WINNER,
        payload: data.winner
      })
    })
}