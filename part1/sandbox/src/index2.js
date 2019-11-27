import React, { useState } from 'react'
import ReactDOM from 'react-dom';
// part 1 sandbox

const Display = ({ counter }) => <div>{counter}</div>

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Hello = ({ name, age }) => {
  // this gets both values from props
    const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p> So you are probably born in {bornYear()}</p>
    </div>
  )
}

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [value, setValue] = useState(10)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }
  const hello = (who) => () => {
      console.log('hello', who)
    }
  const setToValue = (newValue) => () => {
    setValue(newValue)
  }

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left'/>
        <Button onClick={handleRightClick} text='right'/>
        {right}
        <History allClicks={allClicks}/>
        <button onClick={hello('world')}>button</button>
        <button onClick={hello('react')}>button</button>
        <button onClick={hello('function')}>button</button>
        {value}
        <button onClick={setToValue(1000)}>thousand</button>
        <button onClick={setToValue(0)}>reset</button>
        <button onClick={setToValue(value + 1)}>increment</button>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
