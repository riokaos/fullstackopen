import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList.js'
import NewAnecdote from './components/NewAnecdote.js'

const App = () => {
  // const anecdotes = useSelector(state => state)
  // const dispatch = useDispatch()
  //
  // const vote = (id) => {
  //   console.log('vote', id)
  // }

  return (
    <div>
      <h2>create new</h2>
      <NewAnecdote />
      <h2>Anecdotes</h2>
      <AnecdoteList  />
    </div>
  )
}

export default App
