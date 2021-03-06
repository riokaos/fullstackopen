
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {Button, Input, Navigation, Footer, Page} from './components/Styles'

import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useRouteMatch, Redirect, useHistory
} from "react-router-dom"

const padding = {
  paddingRight: 5
}

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}


const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();


    const getAll = () => {
      axios
      .get(baseUrl, {cancelToken: source.token,})
      .then(response => {
        const resourcesData = response.data;
        console.log("data names::",resourcesData);
        setResources(resourcesData);
      })
      .catch(error => {
        //remove an allready deleted note from the state
        setResources([]);
      })
    }

    const getAllAsync =async () => {
      try {
        const response = await axios.get(baseUrl)
        setResources(response.data)
      } catch (e) {
        setResources('');

      } finally {
        console.log("finally");
      }
    }
    getAll();

    // return () => source.cancel()
  },[baseUrl])



  const create = async (resource) => {
    // const config = {
    //  headers: { Authorization: token },
    // }
    const response = await axios.post(baseUrl, resource)
    setResources(resources.concat(response.data));
    return response.data

  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  console.log("people:",persons);

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <Page>
      <Router>
        <Navigation>
          <div>
            <Link style={padding} to="/">home</Link>
            <Link style={padding} to="/notes">notes</Link>
            <Link style={padding} to="/persons">persons</Link>
            <Link style={padding} to="/both">Notes & Persons</Link>
          </div>
        </Navigation>




      <Switch>
        <Route path="/anecdotes/:id">

        </Route>
        <Route path="/notes">
          <h2>notes</h2>
          <form onSubmit={handleNoteSubmit}>
            <Input {...content} />
            <Button>create</Button>
          </form>
          {notes.map(n => <p key={n.id}>{n.content}</p>)}

        </Route>
        <Route path="/persons">
          <h2>persons</h2>
          <form onSubmit={handlePersonSubmit}>
            name <input {...name} /> <br/>
            number <Input {...number} />
            <Button primary=''>create</Button>
          </form>
          {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}

        </Route>
        <Route path="/both">
        <table border="2" border-collapse="collapse">
          <tbody>
            <tr>
              <th>
                <h2>notes</h2>
              </th>
              <th>
                <h2>persons</h2>
              </th>
            </tr>
            <tr>
              <td valign="top">
                <form onSubmit={handleNoteSubmit}>
                  <Input {...content} />
                  <Button>create</Button>
                </form>
              </td>
              <td valign="top">
                <form onSubmit={handlePersonSubmit}>
                  name <input {...name} /> <br/>
                  number <Input {...number} />
                  <Button primary=''>create</Button>
                </form>
              </td>
            </tr>
            <tr>
              <td valign="top">
                {notes.map(n => <p key={n.id}>{n.content}</p>)}
              </td>
              <td valign="top">
              {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
              </td>
            </tr>
          </tbody>
        </table>
        </Route>
        <Route path="/">
          <h2>notes</h2>
            {notes.map(n => <p key={n.id}>{n.content}</p>)}
          <h2>persons</h2>
            {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}

        </Route>
      </Switch>

      </Router>
      <Footer>
        <em>Note app, Department of Computer Science 2020</em>
      </Footer>
    </Page>
  )
}

export default App
