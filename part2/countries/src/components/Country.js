import React from 'react'

const Country = ({key,name}) => {
  // console.log("country:",name);
  return (
    <li key={key}>{name}</li>
  )
}

export default Country
