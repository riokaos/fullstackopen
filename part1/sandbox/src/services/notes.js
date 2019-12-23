import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

//We no longer return the promise returned by axios directly. Instead,
//we assign the promise to the request variable and call its then method:
const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting))
  // return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default {
  //since keys are the same as the variables to the rigth we can write it with a more
  //compact syntaxis
  getAll,
  create,
  update
  // getAll: getAll,
  // create: create,
  // update: update
}
