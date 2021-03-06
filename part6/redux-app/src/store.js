import { createStore, combineReducers, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import noteReducer from './reducers/noteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'


const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
// noteService.getAll().then(notes =>
//   store.dispatch(initializeNotes(notes))
// )

export default store
