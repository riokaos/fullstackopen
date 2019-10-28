import React from 'react'

const Name = ({person}) => {
  console.log("person:",person);
  return (
    <li>{person.name} {person.number}</li>
  )
}

export default Name
