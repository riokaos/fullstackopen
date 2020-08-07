import React from 'react'
import { createStore, combineReducers  } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import filterReducer from './filterReducer'

import { createAnecdote } from './anecdoteReducer'
// import { filterChange } from './filterReducer'
// import { createNotification } from './notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

console.log(store.getState())

store.subscribe(() => console.log(store.getState()))
// store.dispatch(createNotification('notification send'))

export default store
