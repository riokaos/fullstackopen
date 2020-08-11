import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log("res:",response);
  return response.data
}

const createNew = async (content) => {
  // console.log("axios::",content);
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const createNew2 = async (content) => {
  // console.log("axios::",content);
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id, newObject) => {
  console.log("axios object::",newObject);
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { getAll, createNew, update }
