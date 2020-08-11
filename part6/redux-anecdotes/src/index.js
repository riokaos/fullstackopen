import React from 'react'
import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { createStore, combineReducers  } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import App from './App'
import {initializeAnecdotes } from './reducers/anecdoteReducer'
// import notificationReducer from './reducers/notificationReducer'
import store from './store'
import anecdoteService from './services/anecdotes'


// anecdoteService.getAll().then(blogs => {
//   console.log('in blogs:',blogs)
//   blogs.sort((a, b) => (b.likes > a.likes) ? 1 : -1)
//   console.log('in blogs sorted:',blogs)
//   // setBlogs( blogs )
// })

// anecdoteService.getAll().then(anecdotes =>
//   anecdotes.forEach(anecdote => {
//     console.log("loop:",anecdote);
//     store.dispatch({ type: 'NEW_ANECDOTE', data: anecdote })
//   })
// )
// console.log("my store:", store);



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
