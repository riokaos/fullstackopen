import anecdoteService from '../services/anecdotes'
import notificationReducer , { setNotification } from './notificationReducer'
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  // 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  // 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  // 'Premature optimization is the root of all evil.',
  // 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
initialState.sort((a, b) => (b.votes > a.votes) ? 1 : -1)
// console.log("initial state:", initialState);

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      // console.log("action::", action.data);
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes +1
      }
      // const notificationToChange = state.notification
      // const changedNotification = {
      //   ...notificationToChange, 'Note added'
      // }
      console.log("state::",state);
      return (
         state.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote
        ).sort((a, b) => (b.votes > a.votes) ? 1 : -1)

      )
     }
    default:
    console.log("default state");
      return state
  }
}

export const createAnecdote = (content, timer_id) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
    dispatch(setNotification(`New anecdote '${content}' created `, 5, timer_id))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    anecdotes.sort((a, b) => (b.votes > a.votes) ? 1 : -1)
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })

  }
}

export const vote = (id, timer_id) => {
  console.log("vote content is here::", timer_id);
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdote = anecdotes.find(n => n.id === id)
    const newVotes = anecdote.votes ? anecdote.votes + 1 : 1
    const changedAnecdote = { ...anecdote, votes: newVotes }
    const id_vote = await anecdoteService.update(id,changedAnecdote)
    dispatch({
      type: 'VOTE',
      data: { id },
    })
    dispatch(setNotification(`Voted for '${anecdote.content}'  `,5,timer_id))
    // setTimeout(() => {
    //     dispatch(setNotification(``));
    //   }, 5000)
  }
}

export default anecdoteReducer
