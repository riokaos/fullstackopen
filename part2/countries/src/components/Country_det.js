import React from 'react'

const Country_det = ({country}) => {
  console.log("country det:",country);
  //map the languages
  const languages = () => country.languages.map(language =>
    <li key={language.name}>{language.name}</li>
  )
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital:{country.capital}</p>
      <p>population:{country.population}</p>
      <h2>Languages:</h2>{languages()}
      <p><img src={country.flag} width="100"/> </p>
    </div>
  )
}

export default Country_det
