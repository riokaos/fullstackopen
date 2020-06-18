import React from 'react'

const Form = ({addContact,newName,newNumber,handleNaChange,handleNuChange}) => {
  // console.log("person in name:",handleSetFilter);
  return (
    <form onSubmit={addContact}>
      <div>debug: {newName}</div>
      <div>
        name: <input value={newName} onChange={handleNaChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNuChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>

  )
}

export default Form
