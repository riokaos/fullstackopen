import React, { useState, useEffect } from 'react'
import Name from './components/Name'
import axios from 'axios'


const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState()
  const [ newNumber, setNewNumber ] = useState()
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState()

  const hook = () => {
    console.log('effect activated');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log("fullfiled promise");
        setPersons(response.data)
      })
  }
  useEffect(hook,[]);
  console.log('render',persons.length,'persons');
  // console.log("eval:",(persons.filter(person => person.name === filter)));

  const personsToShow = filter
   ? persons.filter(person => person.name.indexOf(filter) >-1)
   : persons

  // const personsToShow = () =>{
  //   persons.filter(person => person.name === 'Arto Hellas')
  // }

  // const personsToShow = persons.map((person) => {
  //   // const popMM = (city.pop / 1000000).toFixed(2);
  //   if(filter){
  //     console.log("pts:",(person.name.indexOf(filter) >-1));
  //     return (person.name.indexOf(filter) >-1);
  //   }
  //   else {
  //     console.log("ptsn:",person);
  //     return person;
  //   }
  // });
  // const newFilter = () =>{
    // const personsToShow =  persons.filter(person => person.name === 'Arto Hellas')
  // }
  // var personsToShow = persons
  // const newFilter = () =>{
  //   console.log(newFilter)
  //   // var personsToShow={}
  //   if (newFilter!==""){
  //     console.log("event",newFilter);
  //     // var personsToShow = persons.filter(person => person.name.match(newFilter));
  //     // const rows = () => personsToShow.map(person =>
  //     //   <Name
  //     //     key={person.id}
  //     //     person={person}
  //     //   />
  //     // )
  //   }
  //   else {
  //     console.log("event",newFilter);
  //     // personsToShow=persons;
  //     // console.log("filteredPlacesin:",personsToShow);
  //     // const rows = () => persons.map(person =>
  //     //   <Name
  //     //     key={person.id}
  //     //     person={person}
  //     //   />
  //     // )
  //   }
  //   // console.log("filteredPlaces2:",personsToShow);
  // }
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
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
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
