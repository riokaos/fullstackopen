import React, { useState } from 'react'
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

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
  const [ counter, setCounter ] = useState(0)
  const setToValue = (value) => setCounter(value)
  // const {counter} = props
  return (
    <div>
      <div>{counter}</div>
        <button onClick={() => setToValue(counter + 1)}>
          plus
        </button>
        <button onClick={() => setToValue(0)}>
          zero
        </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
