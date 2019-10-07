import axios from 'axios'

const initialState = {
  players: []
}

/**********PLAYERS CREATORS**********/

const GET_PLAYERS = 'GET_PLAYERS'
const ADD_PLAYER = 'ADD_PLAYER'

export const getPlayersActionCreator = players => ({
  type: GET_PLAYERS,
  players
})

export const getPlayersThunkCreator = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/players')
      dispatch(getPlayersActionCreator(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addPlayerActionCreator = player => ({
  type: ADD_PLAYER,
  player
})

export const addPlayerThunkCreator = (name) => {
  return async dispatch => {
    try {
      console.log('HERE HERE')
      const { data } = await axios.post('/api/players', { name })
      console.log('DATA:', data)
      await dispatch(addPlayerActionCreator(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/************PLAYERS SUB-REDUCER*************/

export const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYERS:
      return { ...state, players: action.players }
    case ADD_PLAYER:
      return { ...state, players: [...state.players, action.player] }
    default:
      return state
  }
}
