import React from 'react'

const Name = ({person, deletePerson}) => {
  console.log("person in name:",person);
  return (
    <li>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </li>

  )
}

export default Name
