import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer, {initializeBlogs, newBlog }  from './reducers/blogReducer'
import notificationReducer, {createNotification} from './reducers/notiReducer'
import  loginReducer , {loginUSer}  from './reducers/loginReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  login: loginReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
