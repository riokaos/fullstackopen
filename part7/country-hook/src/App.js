import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
    // const country = useCountry(value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    // name='Peru'
    const url = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`;
    console.log("my url:", url);
    const getCountry = () => {
      axios
      .get(url)
      .then(response => {
        // console.log("data::",response.data);
        const countries= response.data;
        console.log("data names::",countries);
        // console.log("filter::", name);
        // const country = name
        //   ? countries.filter(country => country.name.indexOf(name) > -1)
        //   : countries
        //   console.log("country found::", country);
        // setCountry(response.data[0]);
        setCountry({ found: true, data: response.data[0] });
      })
      .catch(error => {
        //remove an allready deleted note from the state
        setCountry({ found: false, data: {} });
      })
    }
    getCountry();
      // setCountry({ found: false, data: {} });

  },[name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)


  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }
  console.log("name:", country);

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    // input-field value is in variable event.target.value
    // event.preventDefault()
    // console.log("event:",event.target.value);
    // console.log("nameInput:",nameInput.value);
    // const filterAne = event.target.value
    // event.target.filterA.value = ''
    // console.log("filter::",filterAne);
    // console.log("filter 2:",event.target.value);
    // setName(nameInput.value)
    fetch(event)
  }



  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput}/>
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
