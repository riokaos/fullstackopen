import React,{ useState, useEffect, useRef } from 'react'
// import axios from 'axios'
import Note from './components/Note'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'


const App = (props) => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [notiMessage, setNotiMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // if showAll , notes, else use the filter

  useEffect(() => {
    noteService
      .getAll().then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
      </Togglable>
    )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const toggleImportanceOf = id => {
    // const url = `http://localhost:3001/notes/${id}`
    // find the note we want to modify and assign it to the note variable
    const note = notes.find(n => n.id === id)
    // create a new object that is an exact copy but with the important property
    const changedNote = { ...note, important: !note.important }
    console.log("importance change changednote:",changedNote);

    console.log('effect');
    noteService
      .update(id, changedNote)
      .then(returnedNote =>{
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}'was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      //remove an allready deleted note from the state
      setNotes(notes.filter(n => n.id !== id))
    })
  }
  const noteFormRef = useRef()
  const togglable1 = useRef()
  const togglable2 = useRef()
  const togglable3 = useRef()
  const noteForm = () => (
      <Togglable buttonLabel='new note' ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    )


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

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        // setNewNote('')
        setNotiMessage(
            `Note '${returnedNote.content}' added`
          )
          setTimeout(() => {
            setNotiMessage(null)
          }, 5000)
      })
      .catch(error => {
        // const niceError = () => error.response.data.map(error =>error)
        // let niceError = Object.values(error.response.data);
        let niceError = error.response.data.error
        setErrorMessage(
            `error:'${niceError}''`
          )
        setTimeout(() => {
            setErrorMessage(null)
          }, 15000)
        console.log("Error::",Object.values(error.response.data));
        console.log(niceError);
      })
  }

  const handleLogOut = (event) => {
    // console.log(event.target.value)
    setUser(null)
    window.localStorage.clear()
  }

  return (
    <div>
      <h1>Notes</h1>
      <ErrorNotification message={errorMessage} />
      <Notification message={notiMessage} />
      {user === null ?
         loginForm():
         <div>
            <p>{user.username} logged in <button onClick={() => handleLogOut()}>
            Log out
            </button></p>
          {noteForm()}
         </div>

       }

      <div>
       <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
       </button>
      </div>
      <div>
        <Togglable buttonLabel="1" ref={togglable1}>
          first
        </Togglable>

        <Togglable buttonLabel="2" ref={togglable2}>
          second
        </Togglable>

        <Togglable buttonLabel="3" ref={togglable3}>
          third
        </Togglable>
      </div>
      <div className="note-rows">
        <ul>
          {rows()}
        </ul>
      </div>
      <Footer />
    </div>

  )
}

export default App
