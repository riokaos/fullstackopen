import userService from '../services/users'
// import notificationReducer , { setNotification } from './notiReducer'

const userReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      // console.log('default state')
      return state
  }
}

export const newBlog = (content) => {
  return {
    type: 'NEW_BLOG',
    data: content
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}


export default userReducer
