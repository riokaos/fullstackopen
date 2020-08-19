import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = (props) => {
  // const dispatch = useDispatch()
  const handleChange = (event) => {

    console.log("event:",event.target.value);
    const filterAne = event.target.value

    // dispatch(filterChange(filterAne))
    props.filterChange(filterAne)
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

export default connect(
  null,
  { filterChange }
)(Filter)
// export default Filter
