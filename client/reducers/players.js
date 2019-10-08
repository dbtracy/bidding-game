import axios from 'axios'

const initialState = {
  players: [],
  singlePlayer: {}
}

/**********PLAYERS CREATORS**********/

const GET_PLAYERS = 'GET_PLAYERS'

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

/**********ADD PLAYER CREATORS**********/

const ADD_PLAYER = 'ADD_PLAYER'

export const addPlayerActionCreator = player => ({
  type: ADD_PLAYER,
  player
})

export const addPlayerThunkCreator = (name) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/players', { name })
      await dispatch(addPlayerActionCreator(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/**********DELETE PLAYER CREATORS**********/

const DELETE_PLAYER = 'DELETE_PLAYER'

export const deletePlayerActionCreator = id => ({
  type: DELETE_PLAYER,
  id
})

export const deletePlayerThunkCreator = (id) => {
  return async dispatch => {
    try {
      dispatch(deletePlayerActionCreator(id))
      await axios.delete(`/api/players/${id}`)
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
    case DELETE_PLAYER:
      return {
        ...state, players: state.players.filter(player => {
          return player.id !== action.id
        })
      }
    default:
      return state
  }
}
