import React from 'react'
import ReactDOM from 'react-dom'
// import { createStore, combineReducers  } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import App from './App'
// import anecdoteReducer from './reducers/anecdoteReducer'
// import notificationReducer from './reducers/notificationReducer'
import store from './reducers/store.js'
//
// import { createAnecdote } from './reducers/anecdoteReducer'
// import { notificationChange } from './reducers/notificationReducer'
//
// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   notification: notificationReducer
// })
//
// const store = createStore(
//   reducer,
//   composeWithDevTools()
// )
//
// console.log(store.getState())

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(notificationChange('notification send'))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
