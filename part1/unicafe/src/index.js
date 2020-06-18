import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({value,text}) => {
  return (
    <tr><td>{text}</td>
      <td>{value}</td>
    </tr>
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

const Statistics = ({ good,neutral,bad }) => {
  let total=good+bad+neutral
  let average=(good+(bad*-1))/total
  let positive=good/total
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <Statistic value={good} text='Good'/>
          <Statistic value={neutral} text='Neutral'/>
          <Statistic value={bad} text='Bad'/>
          <Statistic value={total} text='Total'/>
          <Statistic value={average} text='Average'/>
          <Statistic value={positive} text='Positive'/>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <p>Give feedback</p>
      <p>
        <Button onClick={handleGoodClick} text='Good'/>
        <Button onClick={handleNeutralClick} text='Neutral'/>
        <Button onClick={handleBadClick} text='Bad'/>
      </p>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
