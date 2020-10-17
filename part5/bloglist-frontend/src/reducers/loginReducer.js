// import blogService from '../services/blogs'
// import notificationReducer , { setNotification } from './notiReducer'


const loginReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      // console.log("login user red:", action.data);
      // return {...state, login: action.data}
      return action.data
    case 'LOGOUT_USER':
    // return {
    //     ...state,
    //     login: null
    //   }
      return action.data
      // return [...state, action.data]
    default:
      console.log('default state')
      return state
  }
}

export const loginUser = (user) => {
  return {
    type: 'LOGIN_SUCCESS',
    data: user
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
    data: null
  }
}

export default loginReducer
