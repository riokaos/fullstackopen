import React, { useState, useEffect } from 'react'
import Country from './components/Country'
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
  // console.log("eval:",(persons.filter(person => person.name === filter)));

  const countriesToShow = filter
   ? countries.filter(country => country.name.indexOf(filter) >-1)
   : countries

  // if(filter){
  //   if(countriesToShow.length<=10){
  //
  //   }
  // }
  // if (this.state.mode==='estimates') {
	//     Countries=<MultipleOrgSearch
	//     value={this.state.orgUnits}
	//     mode={this.state.mode}
	//     updateOrgUnit={this.updateOrgUnit}/>  ;
	// }
  const rows = () => countriesToShow.map(country =>
    <Country
      key={country.numericCode}
      name={country.name}
    />
  );
   console.log("countries to show",countriesToShow);
  // const rows = () => Object.keys(countries).map(country =>
  console.log("count of countries",countriesToShow.length);
	let Countries_to;
  if(countriesToShow.length<=10){
    Countries_to=rows();
  }
  else {
    Countries_to=<li> too many searches</li>
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
      <h2>Countries</h2>
      <div>
        filter shown with: <input
        type="search"
        onChange={handleSetFilter}
        />
      </div>
      <h2>countries</h2>
      {Countries_to
      }

    </div>
  )
}

export default App
