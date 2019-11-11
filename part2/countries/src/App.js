import React, { useState, useEffect } from 'react'
import Country from './components/Country'
import Country_det from './components/Country_det'
import axios from 'axios'


const App = () => {
  const [ countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState()

  const hook = () => {
    console.log('effect activated');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // console.log("fullfiled promise");
        // console.log(response.data);
        const countries= response.data;
        console.log('countries::',countries);
        setCountries(response.data)
      })
  }
  // console.log('countries:',countries);
  useEffect(hook,[]);
  console.log('render',countries.length,'countries');
  // console.log('element1',countries[0]);

  const countriesToShow = filter
   ? countries.filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase()) >-1)
   : countries

   // console.log("countries to show:*:",countriesToShow);
   // console.log("countries :*:",countries);
   // console.log('element1',countriesToShow[0]);

  const rows = () => countriesToShow.map(country =>
    <Country
      key={country.numericCode}
      name={country.name}
      country={country}
    />
  );
   console.log("countries to show",countriesToShow);
  // const rows = () => Object.keys(countries).map(country =>
  console.log("count of countries",countriesToShow.length);
  // here we create the rules for what should be shown
  //  depending on the amount of results
  let Countries_to;
  if(countriesToShow.length===1){
    Countries_to=<Country_det country={countriesToShow[0]}/>;
  }
  else if(countriesToShow.length<=10){
    Countries_to=rows();
  }
  else if(countriesToShow.length<countries.length) {
    Countries_to=<p> Too many matches</p>
  }




//   console.log("rows:",rows);
//   {Object.keys(githubData).map(key => (
//    <Issue key={key} details={githubData[key]} />
// ))}

  const handleSetFilter = (event) =>{
    console.log("event filter:",event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <div>
        find countries: <input
        type="search"
        onChange={handleSetFilter}
        />
      </div>
      {Countries_to}

    </div>
  )
}

export default App
