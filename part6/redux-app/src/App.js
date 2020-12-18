import React, { useEffect } from 'react';
import { initializeNotes } from './reducers/noteReducer'
// import ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import NewNote from './components/NewNote.js'
import About from './components/About.js'
import Notes from './components/Notes.js'
import VisibilityFilter from './components/VisibilityFilter.js'
import Notification from './components/Notification.js'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Link as Link2,
  Button
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import {
  BrowserRouter as Router,
  Switch, Route,Link,  useParams, useRouteMatch, Redirect, useHistory
} from "react-router-dom"
// import noteService from './services/notes'

// const About = () => (
//   <div>
//     <h2>About anecdote app</h2>
//     <p>According to Wikipedia:</p>
//
//     <em>An anecdote is a brief, revealing account of an individual person or an incident.
//       Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
//       such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
//       An anecdote is "a story with a point."</em>
//
//     <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
//   </div>
// )
const padding = {
  paddingRight: 5
}
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
         home
        </Button>
        <Button color="inherit" component={Link} to="/create">
          create
        </Button>
        <Button color="inherit" component={Link} to="/about">
           about
        </Button>
      </Toolbar>
    </AppBar>
  )
}

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
     dispatch(initializeNotes())
  }, [dispatch])

  const filterSelected = (value) => {
     console.log(value)
  }

  const notiList = useSelector(state => state.notification)
  console.log("noti:", notiList);

  const fullState = useSelector(state => state)
  console.log("full state:", fullState);

  return (

      <Router>
      {notiList &&
      <Alert severity="success">
        <Notification />
      </Alert>
      }
      <Menu />

      <Switch>
        <Route path="/create">
          <NewNote />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Notes />
        </Route>
      </Switch>
      </Router>

  )
}



export default App;
