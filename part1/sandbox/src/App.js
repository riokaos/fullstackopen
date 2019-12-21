import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'


const App = (props) => {
  // const { notes } = props
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  // if showAll , notes, else use the filter

  const toggleImportanceOf = id => {
    const url = `http://localhost:3001/notes/${id}`
    // find the note we want to modify and assign it to the note variable
    const note = notes.find(n => n.id === id)
    // create a new object that is an exact copy but with the important property
    const changedNote = { ...note, important: !note.important }

    console.log('effect');
    noteService
      .update(id, changedNote)
      .then(response =>{
        setNotes(notes.map(note => note.id !== id ? note : response.data))
    })
  }

  const hook = () =>{
    console.log('effect');
    noteService
      .getAll()
      .then(response =>{
        setNotes(response.data)
    })
  }
  useEffect(hook,[])
  console.log('render',notes.length,'notes');

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const rows = () => notesToShow.map(note =>
         <Note
         key={note.id}
         note={note}
         toggleImportance={() => toggleImportanceOf(note.id)}
         />
        )

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      // id: notes.length + 1,
    }
    // setNotes(notes.concat(noteObject))
    // setNewNote('')
    // console.log('button clicked',event.target);
    noteService
      .create(noteObject)
      .then(response => {
        console.log(response)
        setNotes(notes.concat(response.data))
        setNewNote('')
    })
  }

  console.log("notes:",notes);
  const handleNoteChange = (event) => {
  console.log(event.target.value)
  setNewNote(event.target.value)
  }
  return (
    <div>
      <h1>Notes</h1>
      <div>
       <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
       </button>
      </div>
      <ul>
        {rows()}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
