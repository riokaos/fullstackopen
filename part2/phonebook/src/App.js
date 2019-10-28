import React, { useState } from 'react'
import Name from './components/Name'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]
const App = () => {
  const [ persons, setPersons] = useState([
    { id: 1,
      name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState()

  const rows = () => persons.map(person =>
    <Name
      key={person.id}
      person={person}
    />
  )
  // console.log("rows:",rows());

  // const rows = () => notesToShow.map(note =>
  //        <p> key={persons.id} persons={persons}</>
  //       )

  const addName = (event) => {

    // Find if that name already exist
    const exists = Object.values(persons).reduce((t, {name}) =>newName==name, 0)
    console.log("exist",exists);
    if (!exists)
    {
      event.preventDefault()
      const nameObject = {
        name: newName,
        date: new Date().toISOString(),
        id: persons.length + 1,
      }
      setPersons(persons.concat(nameObject))
      setNewName('')
      console.log('button clicked',event.target);
    }
    else {
      event.preventDefault()
      const tempAnswer=newName +' is already added to the phonebook'
      alert(tempAnswer);
      setNewName('')
    }
  }

  console.log("persons:",persons);
  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
      <div>debug: {newName}</div>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}

    </div>
  )
}

export default App
