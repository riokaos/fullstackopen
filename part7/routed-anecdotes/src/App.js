import React, { useState } from 'react'

import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useRouteMatch, Redirect, useHistory
} from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">anecdotes</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/create">create new</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/about">about</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
      <Table striped>
        <tbody>

            {anecdotes.map(anecdote =>
              <tr key={anecdote.id}>
                <td>
                  <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}-</Link>
                </td>
                <td>
                  {anecdote.info}
                </td>
              </tr>
            )}

        </tbody>
      </Table>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Anecdote = ({ anecdote }) => {
  // const id = useParams().id
  // console.log("id::",id);
  // const anecdote = anecdotes.find(n => n.id === (id))
  console.log("anecdotes::", anecdote);
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>{anecdote.author}</div>
    </div>
  )
}

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    history.push('/');
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content:</Form.Label>
           <Form.Control
             type="text"
             name="content"
             value={content}
             onChange={(e) => setContent(e.target.value)}
           />
           <Form.Label>author:</Form.Label>
           <Form.Control
             type="text"
             name="author"
             value={author}
             onChange={(e) => setAuthor(e.target.value)}
           />
           <Form.Label>url:</Form.Label>
           <Form.Control
             type="text"
             name="info"
             value={info}
             onChange={(e) => setInfo(e.target.value)}
           />
          <Button variant="primary" type="submit">
             create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [notiMessage, setNotiMessage] = useState(null)

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === (match.params.id))
    : null

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotiMessage(
        `Anecdote '${anecdote.content}' created!`
      )
      setTimeout(() => {
        setNotiMessage(null)
      }, 5000)
  }

  const padding = {
    padding: 5
  }
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    // <div>
    //   <h1>Software anecdotes</h1>
    //   <Menu />
    //   <AnecdoteList anecdotes={anecdotes} />
    //   <About />
    //   <CreateNew addNew={addNew} />
    //   <Footer />
    // </div>

    // <Router>
    <div className="container">
      <h1>Software anecdotes</h1>
      <Menu />
      {(notiMessage &&
         <Alert variant="success">
           {notiMessage}
         </Alert>
       )}

      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
      <div>
        <i>Note app, Department of Computer Science 2020</i>
      </div>
    </div>
    // </Router>
  )
}

export default App;
