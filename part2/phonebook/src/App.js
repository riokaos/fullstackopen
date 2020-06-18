import React, { useState, useEffect } from 'react'
import Name from './components/Name'
import Filter from './components/Filter'
import Form from './components/Form'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notiMessage, setNotiMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setPersons(response.data)
    //   })
  }, [])
  // console.log('render', persons.length, 'notes')

  const personsToShow = filter
    ? persons.filter(person => person.name.indexOf(filter) > -1)
    : persons

  const rows = () => personsToShow.map(person =>
    <Name
      key={person.id}
      person={person}
      deletePerson={() => deletePersonMain(person.id)}
    />
  )

  const addName = (event) => {
    event.preventDefault()
    // const exists = Object.values(persons).reduce((t, {name}) =>newName===name, 0)
    // const exists = persons.filter(person =>person.name ===newName)
    console.log(persons);
    // console.log(person);
    console.log(newName);
    const exists = persons.findIndex((person) => person.name===newName)
    if (exists<0) {
      const nameObject = {
        name: newName,
        date: new Date().toISOString(),
        number: newNumber
      }
      personService
        .create(nameObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          setNotiMessage(
              `Person '${createdPerson.name}' added`
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
      // axios
      //   .post('http://localhost:3001/persons', nameObject)
      //   .then(response => {
      //     console.log(response)
      //     setPersons(persons.concat(response.data))
      //     setNewName('')
      //     setNewNumber('')
      //   })

    }
    else
      {
        let message=`${newName} is already in the phonebook, do you want to update this phone number?`;
        if (window.confirm(message)) {
          const modPerson = persons.find(n => n.name === newName)
          const changedPerson = {...modPerson,number:newNumber};
          personService
            .update(modPerson.id,changedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
              setNotiMessage(
                  `Person '${returnedPerson.name}' modified`
                )
                setTimeout(() => {
                  setNotiMessage(null)
                }, 5000)
            })
          // axios
          //   .put('http://localhost:3001/persons/'+modPerson.id, changedPerson)
          //   .then(response => {
          //     console.log(response)
          //     setPersons(persons.map(person => person.name !== newName ? person : response.data))
          //     setNewName('')
          //     setNewNumber('')
          //   })
          .catch(error => {
            setErrorMessage(
                `Person '${modPerson.name}' was already deleted`
              )
            setTimeout(() => {
                setErrorMessage(null)
              }, 15000)
            // alert(
            //   `the note '${person.name}' was already deleted from server`
            // )
            //remove an allready deleted note from the state
            setPersons(persons.filter(n => n.name !== newName))
          })
        }
      }
  }

  const deletePersonMain = id => {
    const personD = persons.find(n => n.id === id)
    const restPersons = persons.filter(n => n.id !== id)
    let message=`Are you sure you want to remove ${personD.name} ?`;
    if (window.confirm(message)) {
      personService
        .deletep(id)
        .then(returnedPerson => {
          const toAdd = persons.map(person => person.id !== id ? person : returnedPerson.data);
          setPersons(restPersons)
          setNewName('')
        })
      .catch(error => {
        alert(
          `the note '${personD.name}' was already deleted from server`
        )
        //remove an allready deleted note from the state
        setPersons(persons.filter(n => n.id !== id))
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    // console.log("event filter:",event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSetFilter = (event) =>{
    // console.log("event filter:",event.target.value)
    setFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook V3.3d (3.19-3.21)</h2>
      <Notification message={notiMessage} />
      <ErrorNotification message={errorMessage} />
      <div>
        <Filter value="filter" handleSetFilter={handleSetFilter}/>
      </div>
      <h2>Add contact</h2>
      <Form addContact={addName} newName={newName} newNumber={newNumber}
      handleNaChange={handleNameChange} handleNuChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default App
