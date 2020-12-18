
import React, { useState, useCallback } from 'react'
import { useHistory } from "react-router-dom";
import  { useField } from '../hooks'

const CreateNew = ({addNew}) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')

  // console.log("new::",addNew);

  const [content, resetContent] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [info, resetInfo] = useField('text')


  const history = useHistory()

  const resetForm =useCallback(() =>{
    resetContent();
    resetAuthor();
    resetInfo();
  },[resetContent, resetAuthor, resetInfo])

  const handleSubmit = (e) => {
    console.log("event:",e);
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    resetForm();
    history.push('/');
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
      <div>
          content
          <input  type={content.type}
          value={content.value}
          onChange={content.onChange}/>
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
          <button type="submit">create</button>
          <button type="button" onClick={resetForm}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew
