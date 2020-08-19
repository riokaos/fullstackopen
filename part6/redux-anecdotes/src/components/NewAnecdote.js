import React from 'react'
import { connect, useSelector } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = (props) => {
  // const dispatch = useDispatch()
  console.log(createAnecdote);
  console.log(props.createAnecdote);
  // to fix alert problems
  const timer_id = useSelector(state => {
    return state.timerId
  })
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    // dispatch(createAnecdote(content))

    // Using Connect

    props.createAnecdote(content,timer_id)
  }


  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

export default connect(
  null,
  { createAnecdote }
)(NewAnecdote)

// export default NewAnecdote
