import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const name = 'Peter'
  const age = 10
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Hello name="George" age="23"/>
        <Hello name={name} age={age}/>
      </header>
    </div>
  );
}

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

export default App;
