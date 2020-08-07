import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    // event.preventDefault()
    console.log("event:",event.target.value);
    const filterAne = event.target.value
    // event.target.filterA.value = ''
    // console.log("filter::",filterAne);
    // console.log("filter 2:",event.target.value);
    dispatch(filterChange(filterAne))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name="filterA" onChange={handleChange} />
    </div>
  )
}

export default Filter
