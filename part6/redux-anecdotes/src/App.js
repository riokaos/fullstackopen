import React, { useEffect }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList.js'
import NewAnecdote from './components/NewAnecdote.js'
import Notification from './components/Notification.js'
import Filter from './components/Filter.js'
import {initializeAnecdotes} from './reducers/anecdoteReducer'
// import anecdoteService from './services/anecdotes'
// import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

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
