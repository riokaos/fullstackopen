import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = (props) => {
  console.log(createNote);
  console.log(props.createNote);
  // const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    // dispatch(createNote(content))
    props.createNote(content)
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}


// null since we don not need to access the store state
export default connect(
  null,
  { createNote }
)(NewNote)