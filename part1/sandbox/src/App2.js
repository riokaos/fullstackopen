import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useRouteMatch
} from "react-router-dom"


// PArt 7 example for routing but not working

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = ({notes}) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {notes.map(note =>
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Users = ({notes}) => (
  <div>
     <h2>TKTL notes app</h2>
     <ul>
       <li>Matti Luukkainen</li>
       <li>Juha Tauriainen</li>
       <li>Arto Hellas</li>
     </ul>
   </div>
)

const Home = ({notes}) => (
  <div>
    <h2>Notes</h2>
    <ul>
      Main page
    </ul>
  </div>
)

const App = () => {

  const [notes, setNotes] = useState([
   {
     id: 1,
     content: 'HTML is easy',
     important: true,
     user: 'Matti Luukkainen'
   },
   {
     id: 2,
     content: 'Browser can execute only Javascript',
     important: false,
     user: 'Matti Luukkainen'
   },
   {
     id: 3,
     content: 'Most important methods of HTTP-protocol are GET and POST',
     important: true,
     user: 'Arto Hellas'
   }
 ])

  const [user, setUser] = useState(null)

  const padding = {
    padding: 5
  }

  const match = useRouteMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Switch>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <div>
        <i>Note app, Department of Computer Science 2020</i>
      </div>
    </Router>
  )
}

// ReactDOM.render(<App />, document.getElementById('root'))
export default App
