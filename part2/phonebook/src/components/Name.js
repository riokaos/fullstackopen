import React from 'react'

const Name = ({person}) => {
  console.log("person:",person);
  return (
    <li>{person.name}</li>
  )
}

export default Name
