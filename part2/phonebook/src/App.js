import React, { useState } from 'react'
import Name from './components/Name'


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState()
  const [ newNumber, setNewNumber ] = useState()
  const [showAll, setShowAll] = useState()



  // const personsToShow =  persons.filter(person => person.name === 'Arto Hellas')
  var personsToShow = persons
  const handleSearchChange = (event) =>{
    console.log(event.target.value)
    // var personsToShow={}
    if (event.target.value!==""){
      console.log("event",event.target.value);
      // Assign original list to current
      // personsToShow = persons.filter(element => element.name.some((obj => )));
      personsToShow = persons.filter(person => person.name.match(event.target.value));
      // personsToShow = persons.filter(l => {console.log( person.name.toLowerCase().match(event.target.value));
      console.log("persons:",persons);
      console.log("filteredPlaces:",personsToShow);

    }
    else {
      personsToShow=persons;
      console.log("filteredPlacesin:",personsToShow);
    }
    console.log("filteredPlaces2:",personsToShow);
  }
  const rows = () => personsToShow.map(person =>
    <Name
      key={person.id}
      person={person}
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
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
      console.log('button clicked',event.target);
    }
    else {
      event.preventDefault()
      const tempAnswer=newName +' is already added to the phonebook'
      alert(tempAnswer);
      // setNewName('')
    }
  }

  console.log("persons:",persons);
  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      <button onClick={() => setShowAll(!showAll)}>
       show {showAll ? 'important' : 'all'}
      </button>
        filter shown with: <input
        type="search"
        onChange={handleSearchChange}
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
