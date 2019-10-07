import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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
      <p><button onClick={handleGoodClick}>Good</button></p>
      <p><button onClick={handleNeutralClick}>neurtral</button></p>
      <p><button onClick={handleBadClick}>Bad</button></p>
      <p>Good:{good}</p>
      <p>Neutral:{neutral}</p>
      <p>Bad{bad}</p>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
