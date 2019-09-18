import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts : [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const partsString ="hellos"
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
// console.log(part1);

  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>

    </div>
  )
}

const Header = (props) => {
  return(
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}



class Welcome extends React.Component {
  render()
  {
    const product = []
    this.props.parts.forEach(value => {
      console.log(value)  // numbers 1, -1, 3, 5 are printed, each to own line
      product.push(value)
    })
    return <h1>Hello, {product[0].name}</h1>;
  }
}

const Content = (props) => {
  // console.log(props.parts);
  // const product = []
  // props.parts.forEach(value => {
  //   console.log(value)  // numbers 1, -1, 3, 5 are printed, each to own line
  //   product.push(value)
  // })
  // console.log(props.parts);
  // const partes=props.parts.map(x=>x);
    // console.log(product);
    console.log(props);
  return(
    <div>
      <p>
        <Part name={props.parts[0].name} excercise={props.parts[0].exercise}/>
        <Part name={props.parts[1].name} excercise={props.parts[1].exercise}/>
        <Part name={props.parts[2].name} excercise={props.parts[2].exercise}/>
      </p>


    </div>
  )
}

const Part = (props) => {
  return(
    <p>
      {props.name} {props.excercise}
    </p>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.total}</p>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
