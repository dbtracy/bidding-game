import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import loggingMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

import rootReducer from './reducers'
import thunk from 'redux-thunk'

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware.withExtraArgument({ axios }),
    loggingMiddleware
  ))
)
