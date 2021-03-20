import {
  SET_AUTH_TOKEN,
  SET_BOARD,
  SET_BOARD_ID,
  SET_POINTS,
  SET_STATUS,
  SET_WINNER
} from "./types"

export const changeBoard = (board) => dispatch => {
  dispatch({
    type: SET_BOARD,
    payload: board
  })
}

export const resetBoard = (game) => dispatch => {
  fetch(`api/${game}/new`)
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

export const submitBoard = (game, boardData) => dispatch => {
  fetch(
    `api/${game}/${boardData.id}`,
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