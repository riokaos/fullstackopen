import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good,neutral,bad }) => {
  let total=good+bad+neutral
  let average=(good+(bad*-1))/total
  let positive=good/total
  if (good === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <p>Total:{total}</p>
      <p>Average:{average}</p>
      <p>Positive{positive}</p>
    </div>
  )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
      <p><button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>neurtral</button>
      <button onClick={handleBadClick}>Bad</button></p>
      <p>Good:{good}</p>
      <p>Neutral:{neutral}</p>
      <p>Bad:{bad}</p>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
