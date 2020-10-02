import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import { createStore, combineReducers } from 'redux'
import store from './store'

// console.log("state from index::", store.getState())

store.subscribe(() => console.log("state from index2::", store.getState()))
// store.dispatch(createNotification('IMPORTANT'))
// store.dispatch(newBlog('combineReducers forms one reducer from many simple reducers'))

// blogService.getAll().then(blogs =>
//   blogs.forEach(note => {
//     store.dispatch({ type: 'NEW_BLOG', data: note })
//   })
// )

// simplify
// blogService.getAll().then(blogs =>
//   store.dispatch(initializeBlogs(blogs))
// )

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
