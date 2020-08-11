import React, { useEffect } from 'react';
import { initializeNotes } from './reducers/noteReducer'
// import ReactDOM from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import NewNote from './components/NewNote.js'
import Notes from './components/Notes.js'
import VisibilityFilter from './components/VisibilityFilter.js'
import noteService from './services/notes'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
   noteService
     .getAll().then(notes => dispatch(initializeNotes(notes)))
  }, [dispatch])

  const filterSelected = (value) => {
     console.log(value)
  }


  return (
    <div>
       <NewNote />
       <VisibilityFilter />
       <Notes  />
    </div>
  )
}



export default App;
