import React from 'react'
import { connect, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>

      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
        </div>
      </div>
    </li>
  )
}

const AnecdotesList = (props) => {
  // using dispacth and useSelector , The new way
  // const dispatch = useDispatch()

  // const anecdotes = useSelector(({ filter, anecdotes }) => {
  //   return filter.length > 0
  //     // ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  //     ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1)
  //     : anecdotes
  // })

  //connect usage before moving to underneath
  // const anecdotesToShow = () => {
  //   return props.anecdotes
  // }
  // const { timer_id } = getState();
  const timer_id = useSelector(state => {
    return state.timerId
  })

  console.log("the timer id::",timer_id);

  return(
    <ul>
      {props.anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() =>
            {
              props.vote(anecdote.id,timer_id)
              // dispatch(vote(anecdote.id))
            }
          }
        />
      )}
    </ul>
  )
}

const mapStateToProps = (state) => {
  if ( state.filter.length === 0){
    return {
      anecdotes: state.anecdotes
    }
  }
  return {
    anecdotes: (state.filter.length > 0
     ? state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(state.filter.toLowerCase()) > -1)
     : state.anecdotes
    )
   }
}

const mapDispatchToProps = {
  vote,
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdotesList)
export default ConnectedAnecdotes
