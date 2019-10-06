import axios from 'axios'

const initialState = {
  players: [],
  singlePlayer: {}
}

/**********PLAYERS CREATORS**********/

const GET_PLAYERS = 'GET_PLAYERS'

export const getPlayersActionCreator = players => {
  type: GET_PLAYERS,
    players
}

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

/************PLAYERS SUB-REDUCER*************/

export const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYERS:
      return { ...state, players: action.players }
    default:
      return state
  }
}
