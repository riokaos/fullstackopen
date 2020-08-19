const timerReducer = (state = '', action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
    case 'SET_TIMERID':
      return action.timerId
    default:
      return state
  }
}

export const setTimerId = timerId => {
  return {
    type: 'SET_TIMERID',
    timerId,
  }
}

export default timerReducer
