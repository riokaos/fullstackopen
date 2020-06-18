import React from 'react'

const Filter = ({handleSetFilter}) => {
  // console.log("person in name:",handleSetFilter);
  return (
    <div>
      filter shown with: <input
      type="search"
      onChange={handleSetFilter}/>
    </div>

  )
}

export default Filter
