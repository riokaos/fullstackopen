const notificationAtStart = ""

const notificationReducer = (state = notificationAtStart, action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        data: ""
      }
    default:
      return state
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
