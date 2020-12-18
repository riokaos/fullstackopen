import React from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import { useHistory } from "react-router-dom";
import {
  Button, TextField
} from '@material-ui/core'



const NewNote = (props) => {
  const dispatch = useDispatch()

  const history = useHistory()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    // console.log("content:", content);
    dispatch(createNote(content))
    history.push('/');
  }

  return (
    <form onSubmit={addNote}>

      <div>
        <TextField label="note" name="note" variant="outlined" size="small"/>
        <Button variant="contained" color="primary" type="submit">
              add
        </Button>
      </div>
    </form>
  )
}

export default NewNote
