import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
// const list = new Array(6).fill(0);
const Maxvoted = ({anecdotes,votes}) => {
  let i = votes.indexOf(Math.max(...votes));
  return (
    <div><p>{anecdotes[i]}</p>
      <p>Has {votes[i]} votes</p></div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const arrayOfCeros=new Array(props.anecdotes.length).fill(0)
  const [vote, setVote] = useState(arrayOfCeros)

  console.log("array vote:",vote);

  const handleRandomClick = () => {
    let newQuoate=Math.floor(Math.random()*props.anecdotes.length);
    setSelected(newQuoate)
  }
  const handleVoteClick = () => {
    console.log("array vote2:",vote);
    vote[selected]=vote[selected]+1
    const copyVote = [ ...vote ]
    console.log("array vote3:",vote);
    setVote(copyVote)
  }

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>Has {vote[selected]} votes</p>
      <p>
        <Button onClick={handleVoteClick} text='Vote'/>
        <Button onClick={handleRandomClick} text='Random quote'/>
      </p>
      <Maxvoted anecdotes={props.anecdotes} votes={vote}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
