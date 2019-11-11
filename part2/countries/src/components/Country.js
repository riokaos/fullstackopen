import React,{ useState} from 'react'
import Country_det from './Country_det'

const Country = ({key,name,country}) => {
  // console.log("country:",name);
  const [show, setShow] = useState(false)
  const infoToshow = show
    ? <Country_det country={country}/>
    : <td key={key}>{name}</td>


  return (
    <div>{infoToshow}
      <td>
        <button onClick={() => setShow(!show)}>
          show {show ? 'less' : 'more' }
        </button>
      </td>
    </div>
  )
}

export default Country
