import React from 'react'

const Course = (props) =>{
  return (
    <div>
      <Header name={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>

    </div>
  )
}
export default Course

const Header = (props) => {
  return(
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Content = (props) => {
    // console.log(props);
    // const result= props.parts.map(part =>part.id)
    // const result = notes.map(note => note.id)
    const rows = () => props.parts.map(part =>
           <Part key={part.id} name={part.name} excercise={part.exercises}/>
          )
    // console.log("result",result);

  return(
    <div>
        {rows()}
    </div>
  )
}

const Part = ({name,excercise}) => {
  return(
    <p>
      {name} {excercise}
    </p>
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

const Total = ({parts}) => {
  const total = Object.values(parts).reduce((t, {exercises}) => t + exercises, 0)
  console.log('total',total);
  return(
    <div>
      <b>Number of exercises {total}</b>
    </div>
  )
}
