import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList.js'
import NewAnecdote from './components/NewAnecdote.js'
import Notification from './components/Notification.js'
import Filter from './components/Filter.js'

const App = () => {
  // const anecdotes = useSelector(state => state)
  // const dispatch = useDispatch()
  //
  // const vote = (id) => {
  //   console.log('vote', id)
  // }
  const notiList = useSelector(state => state.notification)
  // console.log("not_list:", notiList);
  // console.log("length:", notiList.length);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {notiList.length > 0 &&
      <Notification />}
      <AnecdoteList  />
      <h3>create new</h3>
      <NewAnecdote />


    </div>
  )
}

export default App
