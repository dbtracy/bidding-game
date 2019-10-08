import { combineReducers } from 'redux'

import { playersReducer } from './players'
import { gameReducer } from './game'

const rootReducer = combineReducers({
  playersReducer,
  gameReducer
})

export default rootReducer
