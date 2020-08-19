import React, { useEffect } from 'react';
import { initializeNotes } from './reducers/noteReducer'
// import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import NewNote from './components/NewNote.js'
import Notes from './components/Notes.js'
import VisibilityFilter from './components/VisibilityFilter.js'
// import noteService from './services/notes'
// version with old connect to redux


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
     dispatch(initializeNotes())
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
