const initialState = {
  initBoard: [],
  validation: '',
  solvedBoard: []
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case 'SET_BOARD':
    return { ...state, initBoard: payload }

  case 'SET_VAL':
    return { ...state, validation: payload }

  case 'SET_SOLVE':
    return { ...state, solvedBoard: payload }

  default:
    return state
  }
}

export default reducer