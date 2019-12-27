import React, { useState, useEffect } from 'react'
import Name from './components/Name'
import Notification from './components/Notification'
// import axios from 'axios'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState()
  const [ newNumber, setNewNumber ] = useState()
  // const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState()
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    console.log('effect activated');
    personService
      .getAll()
      .then(initialPersons=>{
        setPersons(initialPersons)
      })
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log("fullfiled promise");
    //     setPersons(response.data)
    //   })
  }
  useEffect(hook,[]);
  console.log('render',persons.length,'persons');

// now filter on the name typed in the search
  const personsToShow = filter
   ? persons.filter(person => person.name.indexOf(filter) >-1)
   : persons

  const rows = () => personsToShow.map(person =>
    <Name
      key={person.id}
      person={person}
      deletePerson={() => deletePersonf(person.id)}
    />
  )


  const addName = (event) => {
    // Find if that name already exist
    const exists = Object.values(persons).reduce((t, {name}) =>newName===name, 0)
    console.log("object value:",Object.values(persons));
    console.log("Newname:",newName);
    console.log("exist",exists);
    if (!exists)
    {
      event.preventDefault()
      const nameObject = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
        id: persons.length + 1,

      }
      personService
        .create(nameObject)
        .then(returnedPerson => {
          // console.log(response)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          //write a message
          // console.log("message:",);
          setErrorMessage(
              `Person '${returnedPerson.name}' added`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
      })

      // axios
      //   .post('http://localhost:3001/persons',nameObject)
      //   .then(response =>{
      //     console.log(response);
      //     setPersons(persons.concat(response.data))
      //     setNewName('')
      //     setNewNumber('')
      //   })
    }
    else {
      // event.preventDefault()
      // const tempAnswer=newName +' is already added to the phonebook'
      // alert(tempAnswer);

      const person = persons.find(n => n.name === newName)
      // create a new object that is an exact copy but with the important property
      const changedPerson = { ...person, number: newNumber }
      console.log("changed:",changedPerson);
      console.log("newnumber:",newName);
      console.log("setnew:",newNumber);
      const message =`${person.name} is already in the phonebook, do you want to update this phone number?`
      if (window.confirm(message)) {
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson =>{
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            console.log("setpersons;",setPersons);
          setErrorMessage(
              `Person '${person.name}' edited`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
        })
        .catch(error => {
          alert(
            `the note '${person.name}' was already deleted from server`
          )
          //remove an allready deleted note from the state
          setPersons(persons.filter(n => n.name !== newName))
        })
      } //enf if window.confirm
    }
  }

  const deletePersonf = id => {
    // console.log("persons1:",persons);
    // const url = `http://localhost:3001/notes/${id}`
    // find the note we want to modify and assign it to the note variable
    const person = persons.find(n => n.id === id)
    // create a new object that is an exact copy but with the important property
    const changedPerson = persons.filter(n => n.id !== id)
    console.log("changepersons:",changedPerson);
    const message =`Do you really want to delete ${person.name} ?`
    if (window.confirm(message)) {
      console.log("delete");
      personService
        .deletep(id)
        .then(returnedPerson =>{
          setPersons(changedPerson)
      })
      .catch(error => {
        alert(
          `the note '${person.content}' was already deleted from server`
        )
        //remove an allready deleted note from the state
        setPersons(persons.filter(n => n.id !== id))
      })
    } //if confirmation window
  }

  // console.log("persons3:",persons);
  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    console.log("event:",event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSetFilter = (event) =>{
    console.log("event filter:",event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <div>
        filter shown with: <input
        type="search"
        onChange={handleSetFilter}
        />
      </div>
      <form onSubmit={addName}>
      <div>debug: {newName}</div>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumberChange}
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
