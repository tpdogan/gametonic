import { CREATE_USER, FETCH_USERS, NEW_USER } from "./types"

// Create user for a given data
export const createUser = (userData) => dispatch => {
  fetch(
    'api/users',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userData)
    }
  )
    .then( response => response.json() )
    .then( data => {
      dispatch(
        {
          type: CREATE_USER,
          payload: data.user
        }
      )
    })
}

// Fetch all users for a specific game / or all if game is empty (check users controller)
export const fetchUsers = (game) => dispatch => {
  fetch(`api/users?game=${game}`)
    .then( response => response.json() )
    .then( data => {
      dispatch(
        {
          type: FETCH_USERS,
          payload: data.users
        }
      )
    })
}

// Get a auth token for a new user form
export const newUser = () => dispatch => {
  fetch('api/users/new')
    .then( response => response.json() )
    .then( data => {
      dispatch(
        {
          type: NEW_USER,
          payload: data.authenticity_token
        }
      )
    })
}