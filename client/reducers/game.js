import axios from 'axios'

const initialState = {
  highestRound: 10
}

/********GET HIGHEST ROUND CREATORS*********/

const GET_HIGHEST_ROUND = 'GET_HIGHEST_ROUND'

export const getHighestRoundActionCreator = (highestRound) => ({
  type: GET_HIGHEST_ROUND,
  highestRound
})

export const getHighestRoundThunkCreator = () => {
  return (dispatch) => {
    const highestRound = initialState.highestRound
    dispatch(getHighestRoundActionCreator(highestRound))
  }
}

/***********UPDATE HIGHEST ROUND CREATORS************/

const UPDATE_HIGHEST_ROUND = 'UPDATE_HIGHEST_ROUND'

export const updateHighestRoundActionCreator = (newHighestRound) => ({
  type: UPDATE_HIGHEST_ROUND,
  newHighestRound
})

export const updateHighestRoundThunkCreator = (newHighestRound) => {
  return async dispatch => {
    try {
      // const updatedRound = action.newHighestRound
      await dispatch(updateHighestRoundActionCreator(newHighestRound))
    } catch (error) {
      console.log(error)
    }
  }
}

/*********SUB-REDUCER*********/

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HIGHEST_ROUND:
      return { ...state, highestRound: action.highestRound }
    case UPDATE_HIGHEST_ROUND:
      return { ...state, highestRound: action.newHighestRound }
    default:
      return state
  }
}
