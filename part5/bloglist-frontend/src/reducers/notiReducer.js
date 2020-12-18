const notificationAtStart = ''


const notificationReducer = (state = notificationAtStart, action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      // return state.concat(action.data)
      // return [...state, action.data]
      return action.data
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        data: ''

      }
      console.log('state: ', state)
    default:
      return state
  }
}

export const createNotification = (content) => {
  return {
    type: 'SET_NOTIFICATION',
    data: content
  }
}
// hasta aca lo que se usa


export const initializeAnecdotes = () => {
  return async dispatch => {
    // const anecdotes = await anecdoteService.getAll()
    // anecdotes.sort((a, b) => (b.votes > a.votes) ? 1 : -1)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: '',
    })
  }
}


export const setNotification = (notification,secs) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })
    setTimeout(() => {
      dispatch(clearNotification(``));
    }, secs*1000)

  }
}

export const clearNotification =() => {
  return {
    type: 'SET_NOTIFICATION',
    data: ''
  }
}

export const showNotification = (message, time) => {
  return dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      message: message
    })

    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION',
        data: null,
      })
    }, time * 1000)
  }
}

export const removeNotification= () => {
  return {
    type: 'CLEAR_NOTIFICATION',
    data: null
  }
}

export default notificationReducer
