import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Link,
} from '@material-ui/core'

const Note = ({ note, handleClick }) => {
  return(
    // <li onClick={handleClick}>
    //   {note.content}
    //   <strong> {note.important ? 'important' : ''}</strong>
    // </li>
    <TableRow key={note.id} onClick={handleClick}>
      <TableCell>
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </TableCell>
      <TableCell>
        <strong> {note.important ? 'important' : ''}</strong>
      </TableCell>
    </TableRow>
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(({ filter, notes }) => {
    if(filter ==='ALL'){
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
  })
  console.log("notes:",notes);

  return(
    <TableContainer component = {Paper}>
      <Table>
        <TableBody>
        {notes.map(note =>
          <Note
            key={note.id}
            note={note}
            handleClick={() =>
              dispatch(toggleImportanceOf(note.id))
            }
          />
        )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Notes
