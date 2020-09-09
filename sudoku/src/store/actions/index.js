export const genBoard = (level) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
      const data = await res.json()
      const payload = data.board
      dispatch({
        type: 'SET_BOARD',
        payload
      })
    }
    catch (err) {
      console.log('err', err)
    }
  }
}

export const validateBoard = (board) => {
  return async (dispatch) => {
    try {
      const data = await fetch('https://sugoku.herokuapp.com/validate', {
        method: 'POST',
        body: board,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded' 
        }
      })
      const payload = await data.json()
      dispatch({
        type: 'SET_VAL',
        payload: payload.status
      })
    }
    catch (err) {
      console.log('err', err)
    }
  }
}

export const solveBoard = (board) => {
  return async (dispatch) => {
    try {
      const data = await fetch('https://sugoku.herokuapp.com/solve', {
        method: 'POST',
        body: board,
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded' 
        }
      })
      const payload = await data.json()
      dispatch({
        type: 'SET_SOLVE',
        payload: payload.solution
      })
      dispatch({
        type: 'SET_VAL',
        payload: payload.status
      })
    }
    catch (err) {
      console.log('err', err)
    }
  }
}
