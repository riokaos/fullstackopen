import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers  } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import App from './App'

import noteReducer, { initialNotes, initializeNotes } from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

import noteService from './services/notes'

import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)
noteService.getAll().then(notes =>
  store.dispatch(initializeNotes(notes))
)

console.log(store.getState())

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  // <div />,
  document.getElementById('root')
)
