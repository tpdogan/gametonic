import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/root_reducer'

const initialState = {}

const middleWare = [thunk]

// The store with initial state and thunk middleware is created
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleWare)
  //compose(,
  //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  //)
)

export default store