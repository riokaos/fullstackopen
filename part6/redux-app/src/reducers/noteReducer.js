import noteService from '../services/notes'
import notificationReducer , { setNotification } from './notificationReducer'

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const noteReducer = (state = [], action) => {
  console.log('ACTION: ', action)
  switch(action.type) {
    case 'NEW_NOTE':
      return state.concat(action.data)
      // return [...state, action.data]
    case 'INIT_NOTES':
      return action.data
    case 'TOGGLE_IMPORTANCE': {
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note =>
        note.id !== id ? note : changedNote
      )
     }
    default:
      return state
  }
}


export const createNote = (content) => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    console.log("new_note:", newNote);
    dispatch({
      type: 'NEW_NOTE',
      data: newNote,
    })
    dispatch(setNotification(`New anecdote '${content}' created `,5))
  }
}


export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes,
    })
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export default noteReducer
